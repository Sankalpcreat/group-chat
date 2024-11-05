import axios from 'axios';
import { Room } from '../types/Room';

const API_BASE_URL = 'http://localhost:5124/api';

class RoomService {

  static async getRooms(): Promise<Room[]> {
    try {
      const response = await axios.get<Room[]>(`${API_BASE_URL}/rooms`);
      console.log("Fetched rooms:", response.data.data); 
      return response.data.data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  }


  static async createRoom(name: string): Promise<Room> {
    try {
      const response = await axios.post<Room>(`${API_BASE_URL}/rooms/create`, { name });
      return response.data.data;
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  }

}
  export default RoomService;