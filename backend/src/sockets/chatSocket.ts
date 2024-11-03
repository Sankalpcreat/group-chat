import { Server, Socket } from 'socket.io';
import RoomService from '../services/RoomService';
import MessageService from '../service/MessageService';

export function setupChatSocket(io: Server) {
    //making conenction acrtiv
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);
    //joining the room
    socket.on('joinRoom', async ({ roomId, userName }) => {
      socket.join(roomId);
      io.to(roomId).emit('userJoined', { userName });
        //showing the message
      const messages = await MessageService.getMessages(roomId);
      socket.emit('loadMessages', messages);
    });
    //send message real time 
    socket.on('sendMessage', async ({ roomId, content, userName }) => {
      const message = await MessageService.addMessage(roomId, content, userName);
      io.to(roomId).emit('newMessage', message);
    });
    //leaving the room 
    socket.on('leaveRoom', ({ roomId, userName }) => {
      socket.leave(roomId);
      io.to(roomId).emit('userLeft', { userName });
    });
    //disconnet the socket at end after no chat is there
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
