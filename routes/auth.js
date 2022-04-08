const router = require("express").Router();
const bcrypt = require("bcrypt");
const { contentSecurityPolicy } = require("helmet");
const User = require("../models/User");


router.get("/",(req,res)=>{
    res.send("Auth home");
})

// Register user

router.post("/register",async(req,res)=>{
    
    // check if user already exists with same username 

    const checkUsername = await User.findOne({username:req.body.username});
    const checkEmail = await User.findOne({email:req.body.email});

    if(checkUsername){
        res.status(404).json("User already exists with same username!");
    }
   
    // check if user already exists with same email

    if(checkEmail){
        res.status(404).json("User already exists with same email");
    }

    // encrypting password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
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
        res.status(500).json(err);
    }
})

// login user

router.post("/login",async(req,res)=>{
    const user = await User.findOne({email:req.body.email});
    try{
        if(!user){
            res.status(404).json("No such user exists");
        }else{
            const isCorrectPassword = await bcrypt.compare(req.body.password,user.password);
            if(!isCorrectPassword){
                res.status(400).json("Incorrect Password");
            }else{
                res.status(200).json(user);
            }
        }
    }catch(err){
        res.status(500).json(err);
    }

})


module.exports = router;