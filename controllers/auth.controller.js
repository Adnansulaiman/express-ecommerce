const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User')


const register = async(req,res)=>{
    const {name,email,password,phone,role} = req.body;
    console.log(req.body)
    try{
        const isUserExists = await User.findOne({email:email})
        if(isUserExists){
            return res.status(400).json({message:"User is already exists, use another email address for registration"})
        }
            const hashedPassword = await bcrypt.hash(password,10);
            const user = new User({name,email,password:hashedPassword,phone,role:role || 'customer'});
            await user.save();
            
            res.status(201).json({message:'USer registered successfully!',user});
            console.log('A user created...');
            
        
    }catch(error){
        console.error(error);
    }
}

const login = async(req,res)=>{
    const {email,password} = req.body;
    // console.log(req.body)
    try{
        const user = await User.findOne({email});
        // console.log(user)
        if(!user){
            return res.status(404).json({message:"User not found!"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid password , try again!"})
        }

        const data={
            user:{
                id:user._id,
            }
        }
        const token = jwt.sign(data,process.env.JWT_SKEY,{expiresIn:'1d'});
        res.json({message:'Login successful',token})
    }catch(err){
        console.error(err);
    }
}

module.exports= {
    register,
    login
}