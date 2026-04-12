const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const register = async (username, email, password) => {
    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
        const err = new Error('Email already in use');
        err.status = 409;
        throw err;
    }

    const existingUsername = await userRepository.findByUsername(username);
    if (existingUsername) {
        const err = new Error('Username already taken');
        err.status = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.create({ username, email, password: hashedPassword });
    return user;
};

const login = async(email, password)=>{
    try {
        const user = await userRepository.findByEmail(email);
        if(!user) throw {error: 'No user exists'};
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if(!passwordMatch){
            console.log("Password doesn't match");
            throw {error: "Incorrect Password"};
        }
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        return token;
    } catch (error) {
        throw error;
    }
    
    
}

module.exports = {
    register,
    login
}