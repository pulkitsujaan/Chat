const Message = require('../models/Message');

const getByRoom = async(room, limit=50)=>{
    const messages = await Message.find({ room }).limit(limit).sort({ createdAt: 1 });

    return messages;
}

const save = async ({ sender, room, content }) => {
    const message = new Message({ sender, room, content });
    return await message.save();
};

module.exports = {
    getByRoom,
    save
}