import { Server, Socket } from 'socket.io';
import RoomService from '../service/RoomService';
import MessageService from '../service/MessageService';

export function setupChatSocket(io: Server) {

  // Making connection active
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

   

    // Joining the room
    socket.on('joinRoom', async ({ roomId, userName }) => {
      socket.join(roomId);
      console.log("user joined");
      io.to(roomId).emit('userJoined', { userName });

      // Loading messages in the room
      const messages = await MessageService.getMessages(roomId);
      socket.emit('loadMessages', messages);
    });

    // Creating a room
    socket.on('createRoom', async (roomName: string) => {
      try {
        const newRoom = await RoomService.createRoom(roomName);
        console.log("Create Room ");
        io.emit('newRoom', newRoom); 
      } catch (error) {
        console.error('Error creating room:', error);
      }
    });

    // Sending a message in real-time
    socket.on('sendMessage', async ({ roomId, content, userName }) => {
      const message = await MessageService.addMessage(roomId, content, userName);
      console.log("message send")
      io.to(roomId).emit('newMessage', message);
    });

    // Leaving the room
    socket.on('leaveRoom', ({ roomId, userName }) => {


      socket.leave(roomId);
      console.log("left room")
      io.to(roomId).emit('userLeft', { userName });
    });

    // Disconnecting the socket when no chat is there
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
