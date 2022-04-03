const router = require("express").Router();
const User = require("../models/User");

router.get("/",(req,res)=>{
    console.log("Auth home");
    res.send("Auth home");
})


router.get("/register",async(req,res)=>{
    const user = await new User({
        username:"Sashwat",
        email:"sashwat@gmail.com",
        password:"Password",
    })

    await user.save();
    res.send("User added");
})


module.exports = router;