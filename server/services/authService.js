const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const register = async(username, email, password)=>{
    try {
        const email = await userRepository.findByEmail(email);
        if(email)
            throw new Error('User already exists');
        const username = await userRepository.findByUsername(username);
        if(username)
            throw new Error('User already exists');

        const hash = bcrypt.hashSync(password, 10);
        const user = await userRepository.create({username, email, password:hash});
        return user;
    } catch (error) {
        throw error;
    }
}

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