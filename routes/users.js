const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require('../models/User');


// Cred operations ->

// updating the user's info

router.put("/:id",async(req,res)=>{

    console.log(req.params.id);
    console.log(req.body.userId);
    
    // if user id matches with id passed in url or the user is admin itself

    if(req.params.id==req.body.userId||req.body.isAdmin){

        // if we have to update the password also, then we will have to encrypt it using bcrypt and then
        // store the encrypted password in my db

        if(req.body.password){
            // console.log(req.body.password);
            try{
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            }catch(err){
                return res.status(404).json(err);
            }
        }

        // if we have to update data other than password then we don't have to encrypt it
        // we'll store it normally without any encryption

        try{
            const updatedUser = await User.findByIdAndUpdate(req.body.userId,{
                $set:req.body,
            });
            res.status(200).json("User has been updated successfully!");
        }catch(err){
            return res.status(404).json(err);
        }

        // else the user is not authorised to change/update any other user's data

    }else{
        return res.status(401).json("Not authorised to update other's account!");
    }
})

// deleting a particular user

router.delete("/:id",async(req,res)=>{

    if(req.body.userId==req.params.id||req.body.isAdmin){

        try{
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted!");
        }catch(err){
            return res.status(404).json(err);
        }

    }else{
        return res.status(401).json("Not authorised to delete other's account!");
    }

})


// reading/getting a particular user

router.get("/:id",async(req,res)=>{

    try{

        const tempUser = await User.findById(req.params.id);
        const {username,email,_id} = tempUser._doc
        res.status(200).json({username,email,_id});

    }catch(err){
        return res.status(400).json(err);
    }

})

// following a user


// unfollowing a user


module.exports = router;