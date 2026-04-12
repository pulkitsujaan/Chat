const express = require('express');
const http = require('http');         // built into Node, no install needed
const { Server } = require('socket.io');
const dbConnect = require('./config/db');
const initSocket = require('./socket/socket.handler');
const app = express();
const server = http.createServer(app);  // wrap express in http server


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",  // your React port
        methods: ["GET", "POST"]
    }
});


app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/messages', require('./routes/message.routes'));

const startServer = async () => {
    await dbConnect();
    initSocket(io);
    server.listen(5000, () => {
        console.log('Server running on port 5000');
    });
};

startServer();