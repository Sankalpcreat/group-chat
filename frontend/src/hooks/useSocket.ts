// src/hooks/useSocket.ts
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketOptions {
  onMessage: (message: any) => void;
  onUserJoined: (userName: string) => void;
  onUserLeft: (userName: string) => void;
  onLoadMessages: (messages: any[]) => void;
}

const useSocket = (url: string, options: UseSocketOptions) => {
  const { onMessage, onUserJoined, onUserLeft, onLoadMessages } = options;
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
    socket.current = io(url);

    // Listen for 'connect' event
    socket.current.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    // Listen for incoming messages
    socket.current.on('newMessage', onMessage);

    // Listen for user joining the room
    socket.current.on('userJoined', ({ userName }) => {
      onUserJoined(userName);
    });

    // Listen for user leaving the room
    socket.current.on('userLeft', ({ userName }) => {
      onUserLeft(userName);
    });

    // Load initial messages
    socket.current.on('loadMessages', onLoadMessages);

    // Disconnect and cleanup
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [url, onMessage, onUserJoined, onUserLeft, onLoadMessages]);

  // Function to join a room
  const joinRoom = (roomId: string, userName: string) => {
    socket.current?.emit('joinRoom', { roomId, userName });
  };

  // Function to send a message
  const sendMessage = (roomId: string, content: string, userName: string) => {
    socket.current?.emit('sendMessage', { roomId, content, userName });
  };

  // Function to leave a room
  const leaveRoom = (roomId: string, userName: string) => {
    socket.current?.emit('leaveRoom', { roomId, userName });
  };

  return { joinRoom, sendMessage, leaveRoom };
};

export default useSocket;
