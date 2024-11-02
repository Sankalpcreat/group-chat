//here we will have controller for room creation deletion adn get room 

import { Request,Response } from "express";
import RoomService from '../service/RoomService';

export default class RoomController{
    static async createRoom(req:Request,res:Response){
        try {
            const {name}=req.body;
            const room =await RoomService.createRoom(name);
            res.status(201).json(room);
        } catch (error) {
            res.status(500).json({message:'Error creating rome',error});
        }
    }

    static async deleteRoom(req: Request, res: Response) {
        try {
          const { roomId } = req.params;
          await RoomService.deleteRoom(roomId);
          res.status(200).json({ message: 'Room deleted successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error deleting room', error });
        }
      }
    
      static async getRooms(req: Request, res: Response) {
        try {
          const rooms = await RoomService.getRooms();
          res.status(200).json(rooms);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching rooms', error });
        }
      }
    }
