const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    isVerified:{
        type:Boolean

    },
    profilePicture:{
        type:String
    }
},{timestamps:true});

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;