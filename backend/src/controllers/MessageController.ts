import { Request,Response } from "express";
import MessageService from '../service/MessageService';

export default class MessageController{
    static async getMessage(req:Request,res:Response){
        try {
           const {roomId}= req.params;
       const message=await MessageService.getMessage(roomId);
       res.status(200).json(message);
        } catch (error) {
            res.status(500).json({message:'Error fetching message',error});
        }
    }

    static async addMessage(req:Request,res:Response){
        try {
            const {roomId}=req.params;
            const {content,userName}=req.body;
            const message=await MessageService.addMessage(roomId,content,userName);
            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({message:'Error fetching message',error});
        }
    }
}