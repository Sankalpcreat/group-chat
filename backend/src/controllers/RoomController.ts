import { Request,Response } from "express";
import RoomService from '../service/RoomService';
import {  sendErrorResponse, sendSuccessResponse } from "../utils/ApiError";
// import { Server } from 'socket.io';


export default class RoomController{
  // static io: Server; 

  // static initialize(io: Server) {
  //   RoomController.io = io;
  // }
  static async createRoom(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const room = await RoomService.createRoom(name);

    
      sendSuccessResponse(res, 201, room);

     
      // RoomController.io.emit('newRoom', room);
    } catch (error) {
      sendErrorResponse(res, 500, 'Error creating room', error);
    }
  }
  
  static async joinRoom(req: Request, res: Response) {
    const { roomId } = req.params;
    const { userName } = req.body;
    console.log("Joining room:", roomId, "with user:", userName);
    try {
        const updatedRoom = await RoomService.joinRoom(roomId, userName);
        sendSuccessResponse(res, 200, updatedRoom);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error joining room', error);
    }
  }


    static async deleteRoom(req: Request, res: Response) {
        try {
          const { roomId } = req.params;
          await RoomService.deleteRoom(roomId);
          sendSuccessResponse(res, 200, { message: 'Room deleted successfully' });
        } catch (error) {
          sendErrorResponse(res, 500, 'Error deleting room', error);
        }
      }
    
      static async getRooms(req: Request, res: Response) {
        try {
          const rooms = await RoomService.getRooms();
          sendSuccessResponse(res, 200, rooms);
        } catch (error) {
          sendErrorResponse(res, 500, 'Error fetching rooms', error);
        }
      }
    }

