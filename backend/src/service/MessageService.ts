// src/service/MessageService.ts
import redisClient from '../config/redis';
import { Message } from '../models/Message'; 

const MESSAGE_LIMIT = 100;

export default class MessageService {
  static async getMessages(roomId: string): Promise<Message[]> { 
    const messages = await redisClient.lrange(`room:${roomId}:messages`, 0, -1);
    return messages.map((message) => JSON.parse(message));
  }

  static async addMessage(roomId: string, content: string, userName: string): Promise<Message> {
    const message: Message = { id: `${Date.now()}`, content, userName, timestamp: new Date() };

    await redisClient.rpush(`room:${roomId}:messages`, JSON.stringify(message));
    await redisClient.ltrim(`room:${roomId}:messages`, -MESSAGE_LIMIT, -1);

    return message;
  }
}
