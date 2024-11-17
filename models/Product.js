const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    
},{timestamps:true})
const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    images:[{type:String}],
    brand:{
        type:String,
        required:true
    },
    stock:{type:Number,default:0},
    ratings:[ratingSchema],


},{timestamps:true})


module.exports = mongoose.model('Product',productSchema)