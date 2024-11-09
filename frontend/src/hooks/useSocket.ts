import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../types/Message';
import { Room } from '../types/Room';

interface UseSocketOptions {
  onMessage: (message: Message) => void;
  onNewRoom: (room: Room) => void;
  onUserJoined: (userName: string) => void;
  onUserLeft: (userName: string) => void;
  onLoadMessages: (messages: Message[]) => void;
}

const useSocket = (url: string, options: UseSocketOptions) => {
  const { onMessage, onNewRoom, onUserJoined, onUserLeft, onLoadMessages } = options;
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io('https://group-chat-9rix.onrender.com');


    socket.current.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.current.on('newMessage', onMessage);
    socket.current.on('newRoom', onNewRoom);
    socket.current.on('userJoined', ({ userName }: { userName: string }) => onUserJoined(userName));
    socket.current.on('userLeft', ({ userName }: { userName: string }) => onUserLeft(userName));
    socket.current.on('loadMessages', onLoadMessages);

    return () => {
      socket.current?.disconnect();
    };
  }, [onMessage, onNewRoom, onUserJoined, onUserLeft, onLoadMessages]);

  const joinRoom = (roomId: string, userName: string) => {
    socket.current?.emit('joinRoom', { roomId, userName });
  };

  const sendMessage = (roomId: string, content: string, userName: string) => {
    socket.current?.emit('sendMessage', { roomId, content, userName });
  };

  const createRoom = (roomName: string) => {
    socket.current?.emit('createRoom', roomName);
  };

  return { joinRoom, sendMessage, createRoom };
};

export default useSocket;
