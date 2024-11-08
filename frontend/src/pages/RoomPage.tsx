import React, { useState, useEffect } from 'react';
import ChatBox from '../components/Chat/ChatBox';
import MessageInput from '../components/Chat/MessageInput';
import { useParams } from 'react-router-dom';
import useSocket from '../hooks/useSocket';
import { Message } from '../types/Message';

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState<string | null>('User'); // Example username

  const { joinRoom, sendMessage } = useSocket('http://localhost:5124', {
    onMessage: (message: Message) => setMessages((prev) => [...prev, message]),
    onNewRoom: () => {},
    onUserJoined: () => {},
    onUserLeft: () => {},
    onLoadMessages: (loadedMessages) => setMessages(loadedMessages),
  });

  useEffect(() => {
    if (roomId && userName) {
      joinRoom(roomId, userName);
    }
  }, [roomId, userName, joinRoom]);

  const handleSendMessage = (content: string) => {
    if (roomId && userName) {
      sendMessage(roomId, content, userName);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Room: {roomId}</h1>
      <ChatBox messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default RoomPage;
