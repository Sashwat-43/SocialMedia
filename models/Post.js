const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        bio:{
            type:String,
            max:300
        },
        likes:{
            type:Array,
            default:[]
        },
        image:{
            type:String
        }
    },
{timestamps:true}
);

module.exports = mongoose.model("Post",PostSchema);

