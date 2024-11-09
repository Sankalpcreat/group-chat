import axios from 'axios';
import { Message } from '../types/Message';

const API_BASE_URL = 'https://group-chat-9rix.onrender.com/api';

class MessageService {
  static async getMessages(roomId: string): Promise<Message[]> {
    try {
      const response = await axios.get<Message[]>(`${API_BASE_URL}/messages/${roomId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  static async postMessage(roomId: string, content: string, userName: string): Promise<Message> {
    try {
      const response = await axios.post<Message>(`${API_BASE_URL}/messages/${roomId}`, {
        content,
        userName,
      });
      return response.data;
    } catch (error) {
      console.error('Error posting message:', error);
      throw error;
    }
  }
}

export default MessageService;
