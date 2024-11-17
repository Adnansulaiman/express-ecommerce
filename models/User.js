const mongoose = require('mongoose');

const addressSchema =new mongoose.Schema({
    street:String,
    city:String,
    state:String,
    zip:Number,
    country:String
})
const cartItemSchema = new mongoose.Schema({
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            default:1
        }  
})
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true
    },
    address:[addressSchema],
    role:{
        type:String,
        
    },
    cart:{
        cartItems:[cartItemSchema],
        totalPrice:{
            type:Number,
            default:0
        }
    }
    
},{timestamps:true})


module.exports = mongoose.model('User',userSchema)