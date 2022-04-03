const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require('helmet');
const app = express();

dotenv.config();

// console.log(process.env);

// const y= process.env.x;
// console.log(y);

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    ()=>{
        console.log("Connected to Mongo Db");
    }
);

app.listen(8800,()=>{
    console.log("Server is running!")

})