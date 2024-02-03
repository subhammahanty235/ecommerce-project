const mongoose = require('mongoose')

const ItemSchema = mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    totalsales:{
        type:Number,
        default:0,
    },
    totalStocks:{
        type:Number,
        required:true,
    },
})


const Items = mongoose.model('items', ItemSchema);
module.exports = Items;