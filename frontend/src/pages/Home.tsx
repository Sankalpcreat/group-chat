// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import RoomList from '../components/Room/RoomList';
import RoomService from '../services/RoomService';
import GuestLoginPopup from '../components/Popup/GuestLoginPopup';
import { Room } from '../types/Room';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isGuestPopupVisible, setGuestPopupVisible] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await RoomService.getRooms();
      setRooms(data);
    };
    fetchRooms();
  }, []);

  const handleRoomClick = (roomId: string) => {
    if (!userName) {
      // If user is not logged in, show the login popup
      setGuestPopupVisible(true);
      setSelectedRoomId(roomId);
    } else {
      // If user is logged in, navigate directly to the room
      navigate(`/room/${roomId}`);
    }
  };

  const handleLogin = (name: string) => {
    setUserName(name);
    setGuestPopupVisible(false); // Hide login popup after successful login
    if (selectedRoomId) {
      navigate(`/room/${selectedRoomId}`);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Chat Rooms</h1>

      {/* Room List */}
      <RoomList rooms={rooms} onRoomClick={handleRoomClick} />

      {/* Login Popup */}
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
