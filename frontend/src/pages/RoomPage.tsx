import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChatBox from '../components/Chat/CharBox';
import MessageInput from '../components/Chat/MessageInput';

import useSocket from '../hooks/useSocket';
import { Message } from '../types/Message';
import { Notification } from '../types/Nodification';

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userNotifications, setUserNotifications] = useState<Notification[]>([]);
  const [userName, setUserName] = useState<string | null>(sessionStorage.getItem('userName'))

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

  useEffect(() => {
    if (!userName) {
      navigate('/'); 
    } else {
      joinRoom(roomId!, userName);
    }

    return () => {
      if (userName) {
        leaveRoom(roomId!, userName);
      }
    };
  }, [roomId, userName, joinRoom, leaveRoom, navigate]);


  const handleSendMessage = (content: string) => {
    if (userName) {
      sendMessage(roomId!, content, userName);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: `${Date.now()}`, content, userName, timestamp: new Date() }
      ]);
    }
  };




  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Chat Room</h1>

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