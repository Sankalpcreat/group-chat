import redisClient from "../config/redis";
import { Room } from "../models/Room";
import { v4 as uuidv4 } from 'uuid';

const ROOM_LIMIT = 20;
const ROOM_TTL = 360; // 10-minute timeout

export default class RoomService {
    static async createRoom(name: string): Promise<Room> {
        const roomCount = await redisClient.sCard('rooms'); // count number of rooms
        if (roomCount > ROOM_LIMIT) {
            throw new Error('Room reached the maximum limit');
        }

        const roomId = uuidv4();
        const newRoom: Room = { 
            id: roomId, 
            name, 
            users: [], 
            createdAt: new Date() 
        };
        await redisClient.hSet(`room:${roomId}`, {
            name: name,
            createdAt: newRoom.createdAt.toISOString(),
        });
        await redisClient.sAdd('rooms', roomId); // add room ID to Redis
        await redisClient.expire(`room:${roomId}`, ROOM_TTL);
        return newRoom;
    }

    static async deleteRoom(roomId: string): Promise<void> {
        await redisClient.del(`room:${roomId}`);
        await redisClient.sRem('rooms', roomId); // remove room ID from the rooms set
    }

    static async getRooms(): Promise<Room[]> {
        const roomIds = await redisClient.sMembers('rooms'); // get all room IDs
        const rooms: Room[] = [];
    
        for (const roomId of roomIds) {
            const roomData = await redisClient.hGetAll(`room:${roomId}`); // get all room data from Redis
            if (roomData) {
                rooms.push({
                    id: roomId,
                    name: roomData.name,
                    users: [], // users will be populated by the joinRoom function
                    createdAt: new Date(roomData.createdAt),
                });
            }
        }
    
        return rooms;
    }

    static async joinRoom(roomId: string, userName: string): Promise<Room> {
        // Check if room exists
        const roomExists = await redisClient.exists(`room:${roomId}`);
        if (!roomExists) {
            throw new Error('Room does not exist');
        }

        // Add user to room's user list in Redis
        await redisClient.sAdd(`room:${roomId}:users`, userName);

        // Fetch updated room data
        const roomData = await redisClient.hGetAll(`room:${roomId}`);
        const users = await redisClient.sMembers(`room:${roomId}:users`); // get list of users in the room

        // Return the updated room data with users
        return {
            id: roomId,
            name: roomData.name,
            users,
            createdAt: new Date(roomData.createdAt),
        };
    }
}
