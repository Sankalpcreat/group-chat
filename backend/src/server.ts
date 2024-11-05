import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';  
import roomRoutes from './routes/roomRoutes';
import messageRoutes from './routes/messageRoutes';
import { setupChatSocket } from './sockets/chatSocket';
import dotenv from 'dotenv';
import { connect } from './config/redis';

dotenv.config();

const app = express();


app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

app.use('/api/rooms', roomRoutes);
app.use('/api/messages', messageRoutes);

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
setupChatSocket(io);

const PORT = process.env.PORT || 5124;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    connect();
  } catch (error) {
    console.error(error);
  }
});
// http://localhost:5124/api/rooms/create POST for room creation
// http://localhost:5124/api/rooms -GET to get all rooms
// http://localhost:5124/api/rooms/:roomId/join -POST join particular room by room id
// http://localhost:5124/api/rooms/:roomId/leave -POST  Leave particular room by roomID
// http://localhost:5124/api/rooms/:roomId -DELETE  Delete Particular room by room ID
// http://localhost:5124/api/messages/:roomId -POST Post message to particular room id
// http://localhost:5124/api/messages/:roomId -GET  Get Latest 100 message
