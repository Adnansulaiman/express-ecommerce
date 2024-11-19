const Order = require('../models/Order');
const User = require('../models/User');


const billingProcess = async(req,res) =>{

    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const order = new Order(req.body);
        res.status(200).json({message:"Added order details"})
    }catch(error){
        res.status(500).json({message:"Error while adding order details"});
    }
}

const getAOrder = async(req,res) =>{
    const {id} = req.params;
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:"User not found!"});
        }
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({message:"Order details not found"});
        }
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({message:"Error while fetching order details"})
    }
}

const getUserOrder = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:"User not found"});

        }
        const orders = await Order.findById(req.user.id);
        if(!orders){
            return res.status(404).json({message:"Orders not found"});

        }
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json({message:"Error while fetching user orders"});
    }
}

const getAllOrders = async(req,res) =>{
    try{
        const orders = await Order.find({});
        res.status(200).json(orders)
    }catch(error){
        res.status(500).json({message:"Error while fetching orders"})
    }
}

module.exports = {
    billingProcess,
    getAOrder,
    getUserOrder,
    getAllOrders
}



