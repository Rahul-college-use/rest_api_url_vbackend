const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    reg_no: { //registation no.
        type: String,
        required: true,
        unique: true,
    },
    roll_no: {
        type: String,
        required: true,
        unique :true,
    },
    dept:{
        type: String,
        required: true,
    },
    skills:{
        type:[String],
        default:[]
    }

},{timestamps:true})

const User = mongoose.model("User",userSchema);
module.exports=User;