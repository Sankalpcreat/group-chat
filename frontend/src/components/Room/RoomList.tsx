import React from 'react';
import RoomCard from './RoomCard';
import { Room } from '../../types/Room';

interface RoomListProps {
  rooms: Room[];
  onRoomClick: (roomId: string) => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, onRoomClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <RoomCard key={room.id} room={room} onRoomClick={onRoomClick} />
        ))
      ) : (
        <p className="text-center text-gray-500">No rooms available.</p>
      )}
    </div>
  );
};

export default RoomList;
