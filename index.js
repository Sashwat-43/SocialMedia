const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require('helmet');
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();

console.log(process.env.MONGO_URL);

// const y= process.env.x;
// console.log(y);

app.use(helmet());
app.use(express.json());
app.use(morgan("common"));


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

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