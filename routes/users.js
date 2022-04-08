const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require('../models/User');


// Cred operations ->

router.get("/",(req,res)=>{
    res.send("Users home");
})

// updating the user's info

router.put("/:id",async(req,res)=>{

    
    // if user id matches with id passed in url or the user is admin itself

    if(req.params.id==req.body.userId||req.body.isAdmin){

        // if we have to update the password also, then we will have to encrypt it using bcrypt and then
        // store the encrypted password in my db

        if(req.body.password){
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
            const checkUser = await User.findById(req.body.userId);
            if(!checkUser){
                return res.status(404).json("No such user exists!");
            }
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

    // checking whether user is deleting itself or he/she is admin
    // if yes then they can delete the user
    // else they are not authorised to delete some other user

    if(req.body.userId==req.params.id||req.body.isAdmin){

        try{
            const checkUser = await User.findById(req.body.userId);
            if(!checkUser){
                return res.status(404).json("No such user exists!");
            }
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
        // we find the user by using .findById and then show only important details like username,email and id
        // all other details are abstracted as they provide no significant use to the user

        const tempUser = await User.findById(req.params.id);
        if(!tempUser){
            return res.status(404).json("No such user exists!");
        }
        const {username,email,_id} = tempUser._doc
        res.status(200).json({username,email,_id});

    }catch(err){
        return res.status(400).json(err);
    }

})

// following a user

router.put("/:id/follow",async(req,res)=>{

    // checking if the user is trying to follow him/her self
    // if yes then we simply restrict this action and prompt that you cannot follow yourself
    // else we simply find the user with params.id and insert this id in following array of user with id userId
    // and also insert user with userId in followers array of user with params.id

    if(req.params.id!=req.body.userId){

        try{

            const followedUser = await User.findById(req.params.id);
            const followingUser = await User.findById(req.body.userId);
            
            if(!followedUser||!followingUser){
                return res.status(404).json("No such user exists!");
            }
            // checking if followingUser is already following the followedUser
            // if yes then he/she will be present in the followers array of followedUser
            // else he/she is a new follower of followedUser 
            // we insert followedUser's id in followings array of followingUser
            // we insert followingUser's id in followers array of followedUser
            
            if(followedUser.followers.includes(req.body.userId)){

                return res.status(401).json("You are already following this user!");

            }else{

                await followedUser.updateOne({$push:{followers:req.body.userId}});
                await followingUser.updateOne({$push:{followings:req.params.id}});;
                res.status(200).json("You have followed this user!");

            }

        }catch(err){
            res.status(400).json(err);
        }

    }else{

        return res.status(401).json("You cannot follow yourself!");

    }

})

// unfollowing a user

router.put("/:id/unfollow",async(req,res)=>{

    // checking if the user is trying to unfollow him/her self
    // if yes then we simply restrict this action and prompt that you cannot unfollow yourself
    // else we check whether he is even following the user or not
    // if no then we simply restrict this action and prompt that you have not followed this user , so cannot unfollow
    // if he was following the user, then we remove the users from followers and followings array of corresponding users

    if(req.params.id!=req.body.userId){

        try{

            const followedUser = await User.findById(req.params.id);
            const followingUser = await User.findById(req.body.userId);
            if(!followedUser||!followingUser){
                return res.status(404).json("No such user exists!");
            }
            if(followedUser.followers.includes(req.body.userId)){

                await followedUser.updateOne({$pull:{followers:req.body.userId}});
                await followingUser.updateOne({$pull:{followings:req.params.id}});;
                res.status(200).json("You have unfollowed this user!");

            }else{

                return res.status(401).json("You are not following this user!");                

            }

        }catch(err){
            res.status(400).json(err);
        }

    }else{

        return res.status(401).json("You cannot unfollow yourself!");

    }

})


module.exports = router;