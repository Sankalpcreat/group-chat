import React from 'react';
import { Room } from '../../types/Room';


interface RoomCardProps {
  room: Room;
  onRoomClick: (roomId: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onRoomClick }) => {
  return (
    <div
      className="border border-gray-300 rounded-lg shadow-md p-4 hover:bg-gray-100 cursor-pointer"
      onClick={() => onRoomClick(room.id)}
    >
      <h2 className="text-xl font-bold text-blue-400 mb-2">{room.name}</h2>
      <p className="text-sm text-gray-500">Created at: {new Date(room.createdAt).toLocaleString()}</p>
      <p className="text-sm text-gray-500">Users in room: {room.users.length}</p>
    </div>
  );
};

export default RoomCard;
