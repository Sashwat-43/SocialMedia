const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require('helmet');
const app = express();

dotenv.config();

// console.log(process.env);

const y= process.env.x;
console.log(y);

// mongoose.connect(
//     // "mongodb+srv://SocialMedia:SocialMedia123@mysocial.l5o4f.mongodb.net/SocialData?retryWrites=true&w=majority",
//     process.env.MONGO_URI,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     ()=>{
//         console.log("Connected to Mongo Db");
//     }
// );

app.listen(8800,()=>{
    console.log("Server is running!")
    console.log(process.env);
    // console.log(process.env.MONGO_URI);
    // console.log("mongodb+srv://SocialMedia:SocialMedia123@mysocial.l5o4f.mongodb.net/SocialData?retryWrites=true&w=majority");
})