import axios from 'axios';
import { Room } from '../types/Room';

const API_BASE_URL = 'https://group-chat-9rix.onrender.com/api';

class RoomService {
  static async getRooms(): Promise<Room[]> {
    try {
      const response = await axios.get<{ data: Room[] }>(`${API_BASE_URL}/rooms`);
      return response.data.data; 
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  }

  static async createRoom(name: string): Promise<Room> {
    try {
      const response = await axios.post<{ data: Room }>(`${API_BASE_URL}/rooms/create`, { name });
      return response.data.data; //bcz we have nested data
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  }
}

export default RoomService;
