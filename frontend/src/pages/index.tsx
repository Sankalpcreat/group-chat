import React, { useEffect, useState } from 'react';
import RoomList from '../components/Room/RoomList';
import RoomService from '../services/RoomService';

const HomePage: React.FC = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await RoomService.getRooms();
      setRooms(data);
    };
    fetchRooms();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Chat Rooms</h1>
      <RoomList rooms={rooms} />
    </div>
  );
};

export default HomePage;
