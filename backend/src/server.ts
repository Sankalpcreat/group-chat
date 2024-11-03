import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import roomRoutes from './routes/roomRoutes';
import messageRoutes from './routes/messageRoutes';
import { setupChatSocket } from './sockets/chatSocket';


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
});
