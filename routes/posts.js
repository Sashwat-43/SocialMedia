const router = require("express").Router();
const Post = require("../models/Post");


// creating a post

router.post("/",async(req,res)=>{

    const tempPost = new Post(req.body);

    try{
        console.log(tempPost);
        const post = await tempPost.save();
        res.status(200).json(tempPost);

    }catch(err){
        res.status(404).json(err);
    }

})

// updating a post

// getting a post

// deleting a post

// liking a post

// getting all posts of user's followings


module.exports = router; 