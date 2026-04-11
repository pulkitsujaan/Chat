const messageRepository = require('../repositories/messageRepository');

const sendMessage = async(sender, room, content)=>{
    try {
        if(!content){
            const err = new Error("No content");
            err.status = 400;
            throw err;
        }
        const message = await messageRepository.save({sender, room, content});
        return message;
    } catch (error) {
        throw error;
    }
}

const getMessages=async(room)=>{
    try {
        const messages = await messageRepository.getByRoom(room);
        return messages;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getMessages,
    sendMessage
}