import redisClient from '../config/redis';
import { Message } from '../models/Message'; 


const MESSAGE_LIMIT = 100;

export default class MessageService {
  static async getMessages(roomId: string): Promise<Message[]> { 
    const messages = await redisClient.lRange(`room:${roomId}:messages`, 0, -1);
    return messages.map((message) => JSON.parse(message));
  }

  static async addMessage(roomId: string, content: string, userName: string): Promise<Message|undefined> {
    try {
      const message: Message = { id: `${Date.now()}`, content, userName, timestamp: new Date() };
  
      await redisClient.rPush(`room:${roomId}:messages`, JSON.stringify(message));
      await redisClient.lTrim(`room:${roomId}:messages`, -MESSAGE_LIMIT, -1);
  
      return message;
    } catch (error) {
      console.error(error);
    }
  }
}
