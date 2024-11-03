import { Request,Response } from "express";
import MessageService from '../service/MessageService';
import {  sendErrorResponse, sendSuccessResponse } from "../utils/ApiError";

export default class MessageController{
    static async getMessage(req:Request,res:Response){
        try {
           const {roomId}= req.params;
       const message=await MessageService.getMessages(roomId);
       sendSuccessResponse(res,200,message)
        } catch (error) {
            sendErrorResponse(res,500,'Error in fetching message',error);
        }
    }

    static async addMessage(req:Request,res:Response){
        try {
            const {roomId}=req.params;
            const {content,userName}=req.body;
            const message=await MessageService.addMessage(roomId,content,userName);
            sendSuccessResponse(res,201,message)
        } catch (error) {
            sendErrorResponse(res,500,'Error adding message',error);
        }
    }
}