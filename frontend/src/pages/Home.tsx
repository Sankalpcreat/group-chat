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
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const navigate = useNavigate();

  const { onNewRoom } = useSocket('http://localhost:5124', {
    onMessage: () => {}, 
    onUserJoined: () => {}, 
    onUserLeft: () => {},
    onLoadMessages: () => {},
    onNewRoom: (newRoom: Room) => {
      setRooms((prevRooms) => [...prevRooms, newRoom]);
    },
  });

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await RoomService.getRooms();
      setRooms(data);
    };
    fetchRooms();
  }, []);

  const handleRoomClick = (roomId: string) => {
    if (!userName) {
      // Show login popup and save the room ID the user wants to enter
      setGuestPopupVisible(true);
      setSelectedRoomId(roomId);
    } else {
      // Navigate directly to the room if user is logged in
      navigate(`/room/${roomId}`);
    }
  };

  // Handle user login
  const handleLogin = (name: string) => {
    setUserName(name);
    setGuestPopupVisible(false); // Hide the login popup

    // If there's a selected room (user clicked on a room before logging in), navigate to that room
    if (selectedRoomId) {
      navigate(`/room/${selectedRoomId}`);
      setSelectedRoomId(null); // Clear the selected room ID after navigation
    }
  };



  const handleCreateRoom = async () => {
    const roomName = prompt("Enter room name:");
    if (roomName) {
      const newRoom = await RoomService.createRoom(roomName);
      setRooms((prevRooms) => [...prevRooms, newRoom]);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Chat Rooms</h1>

      {/* Show Create Room button only if user is logged in */}
     
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleCreateRoom}
        >
          Create Room
        </button>
    

      <RoomList rooms={rooms} onRoomClick={handleRoomClick} />

      {/* Show Login Popup if needed */}
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