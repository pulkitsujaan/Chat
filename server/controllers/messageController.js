const messageService = require('../services/messageService');

const getMessages = async(req,res)=>{
    try {
        const room = req.params.room;
        const messages = await messageService.getMessages(room);
        return res.status(200).json({messages});
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message });
    }
}

module.exports = {
    getMessages
}