const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
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
    },
    bio:{
        type:String,
        default:"",
        max:60
    },
    city:{
        type:String,
        default:"",
        max:60
    },
    relationship:{
        type:Number,
        enum:[1,2]
    }
},
{timestamps:true}
);

module.exports = mongoose.model("User",UserSchema);

