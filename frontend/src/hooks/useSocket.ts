import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../types/Message';
import { Room } from '../types/Room';

interface UseSocketOptions {
  onMessage: (message: Message) => void; 
  onUserJoined: (userName: string) => void;
  onUserLeft: (userName: string) => void;
  onLoadMessages: (messages: Message[]) => void;
  onNewRoom?: (room: Room) => void; 
}

const useSocket = (url: string, options: UseSocketOptions) => {
  const { onMessage, onUserJoined, onUserLeft, onLoadMessages, onNewRoom } = options;
  const socket = useRef<Socket | null>(null);

  useEffect(() => {

    socket.current = io(url);


    socket.current.on('connect', () => console.log('Connected to Socket.IO server'));

    socket.current.on('newMessage', onMessage);
    socket.current.on('userJoined', ({ userName }: { userName: string }) => onUserJoined(userName));
    socket.current.on('userLeft', ({ userName }: { userName: string }) => onUserLeft(userName));
    socket.current.on('loadMessages', onLoadMessages);

   
    if (onNewRoom) {
      socket.current.on('newRoom', (newRoom: Room) => {
        onNewRoom(newRoom);
      });
    }

    return () => {
      socket.current?.disconnect();
    };
  }, [url, onMessage, onUserJoined, onUserLeft, onLoadMessages, onNewRoom]);

  const joinRoom = (roomId: string, userName: string) => {
    socket.current?.emit('joinRoom', { roomId, userName });
  };

  const sendMessage = (roomId: string, content: string, userName: string) => {
    socket.current?.emit('sendMessage', { roomId, content, userName });
  };

  const leaveRoom = (roomId: string, userName: string) => {
    socket.current?.emit('leaveRoom', { roomId, userName });
  };

  return { joinRoom, sendMessage, leaveRoom };
};

export default useSocket;
