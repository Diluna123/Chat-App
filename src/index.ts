import express from 'express';
import user from './routes/User';
import chat from './routes/chat';
import chatHistory from './routes/chatHistory';
import http from 'http';
import { startWebSocket } from './webSocket';
import cors from "cors";



const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/user", user);

app.use('/chat', chat);

app.use('/chat-history', chatHistory);

const server = http.createServer(app);

startWebSocket(server);

// app.use("/user", User);

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

