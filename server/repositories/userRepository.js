const User = require('../models/User');

const create = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

const findById = async(id)=>{
    const user = await User.findById(id);
    return user;
}

const findByEmail = async (email) => {
    return await User.findOne({ email });
};

const findByUsername = async (username) => {
    return await User.findOne({ username });
};

module.exports = {
    create,
    findById,
    findByEmail,
    findByUsername
}