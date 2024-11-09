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

app.use(cors({ origin: 'https://group-chat-9rix.onrender.com' })); 

app.use(express.json());

app.use('/api/rooms', roomRoutes);
app.use('/api/messages', messageRoutes);

const server = createServer(app);
const io = new Server(server, { 
  cors: { 
    origin: 'https://group-chat-9rix.onrender.com', // Ensure CORS matches frontend
    methods: ['GET', 'POST'],
    credentials: true
  }
});
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
