import React from "react";
import RoomCard from './RoomCard';
import { Room } from '../../types/Room';

interface RoomListProps {
  rooms: Room[];  
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomList;
