const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect  = async (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized access"});

    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SKEY);
        req.user = await User.findById(decoded.user?.id).select('-password');
        next();
    }catch(error){
        res.status(401).json({message:'Invalid token'})
    }
}

const adminProtect = (req,res,next)=>{
    console.log(req.user)
    if(req.user && req.user.role === 'admin'){
        next();
    }else{
        res.status(403).json({message:"Admin access only"})
    }
}


module.exports = {
    protect,
    adminProtect
}