import { Request,Response } from "express";
import RoomService from '../service/RoomService';
import {  sendErrorResponse, sendSuccessResponse } from "../utils/ApiError";

export default class RoomController{
    static async createRoom(req:Request,res:Response){
        try {
            const {name}=req.body;
            const room =await RoomService.createRoom(name);
            sendSuccessResponse(res, 201, room);
        } catch (error) {
          sendErrorResponse(res, 500, 'Error creating room', error);

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
