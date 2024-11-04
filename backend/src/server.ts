import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import roomRoutes from './routes/roomRoutes';
import messageRoutes from './routes/messageRoutes';
import { setupChatSocket } from './sockets/chatSocket';
import dotenv from "dotenv";
import { connect } from './config/redis';

// Load environment variables
dotenv.config();


const app = express();
app.use(express.json());


app.use('/api/rooms', roomRoutes);
app.use('/api/messages', messageRoutes);


const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
setupChatSocket(io);


const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    connect();
  } catch (error) {
    console.error(error);
  }
});


//http://localhost:5124/api/rooms/create  for POST
//http://localhost:5124/api/rooms for GET
//http://localhost:5124/api/rooms/room-id for DELETE
//http://localhost:5124/api/messages/room-id for POST
//http://localhost:5124/api/messages/room-id for GET
