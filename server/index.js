const express = require('express');
const http = require('http');         // built into Node, no install needed
const cors = require('cors')
const { Server } = require('socket.io');
const dbConnect = require('./config/db');
const initSocket = require('./socket/socketHandler');
const app = express();
const server = http.createServer(app);  // wrap express in http server
const dotenv = require('dotenv');

dotenv.config();
const io = new Server(server, {
    cors: {
        origin: "*",  // your React port
        methods: ["GET", "POST"]
    }
});


app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    origin:"*"
}));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

const startServer = async () => {
    await dbConnect();
    initSocket(io);
    server.listen(5000, () => {
        console.log('Server running on port 5000');
    });
};

startServer();