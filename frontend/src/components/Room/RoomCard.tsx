import React from 'react';

import { Room } from '../../types/Room';

interface RoomCardProps {
  room: Room;  
  onRoomClick: (roomId: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room,onRoomClick }) => {


  return (
    <div
      className="border rounded-lg p-4 hover:bg-gray-100 cursor-pointer"
      onClick={() => onRoomClick(room.id)}
    >
      <h2 className="text-xl font-bold">{room.name}</h2>
    </div>
  );
};

export default RoomCard;
