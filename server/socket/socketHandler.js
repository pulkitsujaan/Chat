const messageService = require('../services/messageService');

const initSocket = (io) => {
    io.on('connection', (socket) => {
        // socket = this specific user's connection

        socket.on('join_room', (room) => {
            socket.join(room);
            // socket is now subscribed to that room
        });

        socket.on('send_message', async ({ sender, room, content }) => {
            try {
                const message = await messageService.sendMessage(sender, room, content);
                io.to(room).emit('receive_message', message);
        } catch (error) {
                socket.emit('error', { message: error.message });
        }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};

module.exports = initSocket;