const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  sender:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  content:{
    type:String,
    required:true
  },
  room: {
    type: String,
    required: true
}
},{timestamps: true});

module.exports = mongoose.model("Message", messageSchema);