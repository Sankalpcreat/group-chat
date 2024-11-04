import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RoomCardProps {
  room: { id: string; name: string };
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg p-4 hover:bg-gray-100 cursor-pointer" onClick={() => navigate(`/room/${room.id}`)}>
      <h2 className="text-xl font-bold">{room.name}</h2>
    </div>
  );
};

export default RoomCard;