import React, { useEffect, useState } from 'react';
import RoomList from '../components/Room/RoomList';
import RoomService from '../services/RoomService';
import GuestLoginPopup from '../components/Popup/GuestLoginPopup';
import { Room } from '../types/Room';
import { useNavigate } from 'react-router-dom';
import useSocket from '../hooks/useSocket';

const HomePage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isGuestPopupVisible, setGuestPopupVisible] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  const { createRoom } = useSocket('http://localhost:5124', {
    onMessage: () => {},
    onNewRoom: (newRoom: Room) => setRooms((prev) => [...prev, newRoom]),
    onUserJoined: () => {},
    onUserLeft: () => {},
    onLoadMessages: () => {},
  });

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await RoomService.getRooms();
      setRooms(data);
    };
    fetchRooms();
  }, []);

  const handleCreateRoom = async () => {
    const roomName = prompt('Enter room name:');
    if (roomName) {
      createRoom(roomName);
    }
  };

  const handleLogin = (name: string) => {
    setUserName(name);
    setGuestPopupVisible(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Chat Rooms</h1>
      {userName && (
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleCreateRoom}
        >
          Create Room
        </button>
      )}
      <RoomList rooms={rooms} onRoomClick={(roomId) => navigate(`/room/${roomId}`)} />
      {isGuestPopupVisible && (
        <GuestLoginPopup
          isVisible={isGuestPopupVisible}
          onClose={() => setGuestPopupVisible(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default HomePage;
