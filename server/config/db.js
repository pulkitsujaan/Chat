const mongoose = require('mongoose');

// Connect to MongoDB
const dbconnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/chat');
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = dbconnect;