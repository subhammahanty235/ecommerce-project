const mongoose = require('mongoose')

const OrdersSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
    itemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'items'
    },
    orderDate:{
        type:Date,
        default:new Date(),
    },
    status:{
        type:Number,
        default:1,     //1:--> Order Placed , 2:--> Order Shipped, 3:--> Order Delivered
    }
})


const Orders = mongoose.model('orders', OrdersSchema);
module.exports = Orders;