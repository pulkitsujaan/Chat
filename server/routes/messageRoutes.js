const express = require('express');
const router = express.Router();
const {validateUser} = require('../middleware/auth');
const messageController = require('../controllers/messageController');

router.get('/:room', validateUser, messageController.getMessages);

module.exports = router;