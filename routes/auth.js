const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");


router.get("/",(req,res)=>{
    console.log("Auth home");
    res.send("Auth home");
})

// Register user

router.post("/register",async(req,res)=>{
    
    // encrypting password

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);

    // storing the encrypted password in the userschema

    const tempUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: encryptedPassword
    });
        
    // exception handling and saving user in the db 

    try{
        const user = await tempUser.save();
        res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
})


module.exports = router;