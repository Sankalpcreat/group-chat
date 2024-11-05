import React from "react";
import RoomCard from './RoomCard';
import { Room } from '../../types/Room';

interface RoomListProps {
  rooms: Room[];  
  onRoomClick: (roomId: string) => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms,onRoomClick }) => {
  if (!Array.isArray(rooms)) {
    console.error("Expected rooms to be an array but received:", rooms);
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} onRoomClick={onRoomClick} />
      ))}
    </div>
  );
};


export default RoomList;
