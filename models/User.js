const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min: 5,
        max: 10,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        required:true,
        min:7,
        max:30,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:7
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    profilePic:{
        type:String,
        default:""
    },
    coverPic:{
        type:String,
        default:""
    }
},
{timestamps:true}
);

module.exports = mongoose.model("User",UserSchema);

