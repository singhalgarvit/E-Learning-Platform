const mongoose = require('mongoose');
const {Schema} = mongoose

const OrderSchema = new Schema({
    order_id:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    receipt:{
        type:String,
    },
    user:{
        type:String,
        required:true
    },
    payment_id:{
        type:String
    },
    course:{
        type:Schema.Types.ObjectId,
        ref:'Course',
        required:true
    }
})

const Order = mongoose.model('Order',OrderSchema);
module.exports = Order;