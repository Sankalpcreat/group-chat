import React, { useState, useEffect } from 'react';
import ChatBox from '../components/Chat/ChatBox';
import MessageInput from '../components/Chat/MessageInput';
import { useParams } from 'react-router-dom';
import useSocket from '../hooks/useSocket';
import { Message } from '../types/Message';
import MessageService from '../services/MessageService';

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState<string | null>('User'); // Example username

  const { joinRoom, sendMessage } = useSocket('https://group-chat-9rix.onrender.com', {
    onMessage: (message: Message) => setMessages((prev) => [...prev, message]),
    onNewRoom: () => {},
    onUserJoined: () => {},
    onUserLeft: () => {},
    onLoadMessages: (loadedMessages) => setMessages(loadedMessages),
  });

  useEffect(() => {
    if (roomId) {
      // Load messages when the room is opened
      const fetchMessages = async () => {
        try {
          const data = await MessageService.getMessages(roomId);
          setMessages(data);
        } catch (error) {
          console.error('Error loading messages:', error);
        }
      };

      fetchMessages();

      // Join the room via socket
      if (userName) {
        joinRoom(roomId, userName);
      }
    }
  }, [roomId, userName, joinRoom]);

  const handleSendMessage = async (content: string) => {
    if (roomId && userName) {
      // Send the message via socket
      sendMessage(roomId, content, userName);

      // Optionally, post the message via HTTP for persistence
      try {
        await MessageService.addMessage(roomId, content, userName);
      } catch (error) {
        console.error('Error sending message:', error);
      }
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
