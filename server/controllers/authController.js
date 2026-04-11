const authService = require('../services/authService');

const register = async (req,res)=>{
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            const err = new Error('Missing one of the required fields');
            err.status = 400;
            throw err;
        }
        const user = await authService.register(username, email, password);
        return res.status(201).json({
            data:user,
            message:"User created successfully"
        })
    } catch (error) {
        return res.status(error.status || 500).json({
                message:error.message
            })
    }
    
}

const login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            const err = new Error('Email or Password Missing');
            err.status = 400;
            throw err;
        }
        const token = await authService.login(email,password);
        return res.status(200).json({
            token
        })
    } catch (error) {
        return res.status(error.status || 500).json({
                message:error.message
            })
    }
}

module.exports = {
    login,
    register
}