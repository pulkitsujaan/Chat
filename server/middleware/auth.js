const jwt = require('jsonwebtoken');

const validateUser = async (req,res,next)=>{
    try {
        let token = req.headers.authorization;
        token = token.split(" ")[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const isVerified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = isVerified;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
}

module.exports = {
    validateUser
}