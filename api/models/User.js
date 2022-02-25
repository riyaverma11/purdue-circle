const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username:{
        type:String, 
        required: true,
        max: 16, //max 20 characters
        unique: true
    },

    age:{
        type:Number,
        min: 17,
        max: 110
    },

    email:{
        type:String,
        required:true,
        max:20,
        unique:true
    },

    password:{
        type: String,
        required:true,
        min: 6
    },

    followers:{
        type:Array, //array of usernames
        default:[] //default is empty array 
    },

    following:{
        type:Array, //array of usernames
        default:[] //default is empty array 
    },

    isAdmin:{
        type:Boolean,
        default:false 
    },

    bio:{
        type:String,
        max:50
    }


},
{timestamps:true} // whenever a user is created, update time stamp
);


module.exports = mongoose.model("User", UserSchema);