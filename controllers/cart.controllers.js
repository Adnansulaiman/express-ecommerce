const User = require('../models/User');
const Product = require('../models/Product');



const addToCart = async (req,res)=>{
    const {productId,quantity} = req.body;
    
    try{
        const user = await User.findById(req.user.id);
        
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message:"Product not found"})
        }
        
        const isExistsProduct = user.cart.cartItems.findIndex(item => item.productId.toString() === productId)
        if(isExistsProduct !== -1){
            user.cart.cartItems[isExistsProduct].quantity += 1
        }else{
            user.cart.cartItems.push({productId,quantity})
        }

        
        
        await user.save();
        res.status(200).json({message:"Product added to cart",cart:user.cart})
         
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Error adding product to cart"})
    }
}

const getCart = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).populate("cart.cartItems.productId");
        let total = 0;
        user.cart.cartItems.forEach(item => total += Math.floor(item.productId.price) * item.quantity);
        user.cart.totalPrice = total;
        await user.save()
        res.status(200).json(user.cart);
    }catch(error){
        res.status(500).json({message:"Error to get cart",error})
    }
}

const resetCart = async (req,res) =>{
    try{
        const user = await User.findById(req.user.id);
        user.cart.cartItems = [];
        user.cart.totalPrice = 0;
        await user.save()
        res.status(200).json({message:"Successfully remove cart",user})
    }catch(error){
        res.status(500).json({message:"Error to reset cart"})
    }
}

const removeAProductInCart = async(req,res)=>{
    const {id} = req.params;
    try{
        const user = await User.findById(req.user.id);
        if(!user.cart.cartItems){
            res.status(404).json({message:"Product not in cart"})
        }
        const newCart = user.cart.cartItems.filter(item => item.productId.toString() !== id);
        user.cart.cartItems = newCart;
        await user.save();
        res.status(200).json({message:"Remove product in cart",cart:user.cart})
    }catch(error){
        res.status(500).json({message:"Error to remove a product in cart"})
    }
}

module.exports = {
    addToCart,
    getCart,
    resetCart,
    removeAProductInCart
}