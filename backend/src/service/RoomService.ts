import redisClient from "../config/redis";
import { Room } from "../models/Room";
import {v4 as uuidv4} from 'uuid';

const ROOM_LIMIT=20;
const ROOM_TTL=360 //10min timeout

export default class RoomService{
    static async createRoom(name:string):Promise<Room>{
        const roomCount=await redisClient.sCard('room');//count number of room
        if(roomCount>ROOM_LIMIT){
            throw new Error('Room reached highest limit');
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
        await redisClient.sAdd('rooms', roomId); //add room id to redis 
        await redisClient.expire(`room:${roomId}`, ROOM_TTL);
        return newRoom;
    }
    static async deleteRoom(roomId: string): Promise<void> {
      await redisClient.del(roomId); 
    }
  

    static async getRooms(): Promise<Room[]> {
        const roomIds = await redisClient.sMembers('rooms');//get all room id to members
        const rooms: Room[] = [];
    
        for (const roomId of roomIds) {
          const roomData = await redisClient.hGetAll(`room:${roomId}`);//get all room data from redis
          if (roomData) {
            rooms.push({
              id: roomId,
              name: roomData.name,
              users: [], 
              createdAt: new Date(roomData.createdAt),
            });
          }
        }
    
        return rooms;
      }
    }