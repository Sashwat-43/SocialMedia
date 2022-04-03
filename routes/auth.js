const router = require("express").Router();
const User = require("../models/User");

router.get("/",(req,res)=>{
    console.log("Auth home");
    res.send("Auth home");
})

// Register user

router.post("/register",async(req,res)=>{
    const tempUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try{
        const user = await tempUser.save();
        res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
})


module.exports = router;