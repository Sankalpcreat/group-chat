import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatBox from '../components/Chat/ChatBox';
import MessageInput from '../components/Chat/MessageInput';
import GuestLoginPopup from '../components/Popup/GuestLoginPopup';
import useSocket from '../hooks/useSocket';
import { Message } from '../types/Message';
import { Notification } from '../types/Nodification';

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [isGuestPopupVisible, setGuestPopupVisible] = useState(true);
  const [userNotifications, setUserNotifications] = useState<Notification[]>([]);

  const { joinRoom, sendMessage, leaveRoom } = useSocket('http://localhost:5124', {
    onMessage: (message: Message) => setMessages((prevMessages) => [...prevMessages, message]),
    onUserJoined: (userName: string) => {
      setUserNotifications((prev) => [...prev, { message: `${userName} has joined the room`, type: 'userJoined' }]);
    },
    onUserLeft: (userName: string) => {
      setUserNotifications((prev) => [...prev, { message: `${userName} has left the room`, type: 'userLeft' }]);
    },
    onLoadMessages: (loadedMessages: Message[]) => {
      setMessages(loadedMessages);
    },
  });


  const handleGuestLogin = (name: string, age: number) => {
    setUserName(name);
    setGuestPopupVisible(false);
    joinRoom(roomId!, name); 
  };


  const handleSendMessage = (content: string) => {
    if (userName) {
      sendMessage(roomId!, content, userName);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: `${Date.now()}`, content, userName, timestamp: new Date() }
      ]);
    }
  };


  useEffect(() => {
    return () => {
      if (userName) {
        leaveRoom(roomId!, userName);
      }
    };
  }, [roomId, userName, leaveRoom]);

  return (
    <div className='container mx-auto p-4'>
      
      <GuestLoginPopup
        isVisible={isGuestPopupVisible}
        onClose={() => setGuestPopupVisible(false)}
        onLogin={handleGuestLogin}
      />

      <h1 className='text-3xl font-bold mb-6'>Chat Room</h1>

    
      <div className="text-sm text-gray-500 mb-2">
        {userNotifications.map((notification, index) => (
          <div key={index}>{notification.message}</div>
        ))}
      </div>

      <ChatBox messages={messages} />

      
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default RoomPage;
