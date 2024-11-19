const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    price:{
        type:Number,
        required:true
    }
})
const orderSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    order_items:[orderItemSchema],
    total_price:{
        type:Number,
        required:true,
        default:0
    },
    order_status:{
        type:String,
        enum:['pending','shipped','delivered','cancelled'],
        default:'pending'
    },
    
},
{
    timestamps:true
});



module.exports = mongoose.model('Order',orderSchema)