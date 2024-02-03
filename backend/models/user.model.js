const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    totalExpense:{
        type:String,
        default:0,
    },
    joined:{
        type:Date,
        
    }
})


const User = mongoose.model('user', UserSchema);
module.exports = User;