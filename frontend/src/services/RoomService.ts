import axios from 'axios';

const RoomService = {
  async getRooms() {
    const response = await axios.get('/api/rooms');
    return response.data.data;
  },
  
  async createRoom(name: string) {
    const response = await axios.post('/api/rooms/create', { name });
    return response.data.data;
  }
};

export default RoomService;
