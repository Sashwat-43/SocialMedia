const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require('../models/User');


// Cred operations ->

// updating the user's info

router.put("/:id",async(req,res)=>{
    console.log(req.params.id);
    console.log(req.body.userId);
    if(req.params.id==req.body.userId||req.body.isAdmin){

        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
                return res.status(200).json("User has been updated successfully!");
            }catch(err){
                return res.status(404).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            });
            return res.status(200).json("User has been updated successfully!");
        }catch(err){
            return res.status(500).json(err);
        }

    }else{
        return res.status(403).json("Not authorised to update other's account!");
    }
})

// deleting a particular user

// reading/getting a particular user

// following a user

// unfollowing a user


module.exports = router;