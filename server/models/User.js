const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  },
  messages:[{
    type: Schema.Types.ObjectId,
    ref: "Message"
  }]

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);