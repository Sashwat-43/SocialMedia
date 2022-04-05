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

// for updating firstly we find the post with id of params.id
// now we check whether this post is created by the user with userId or not
// if no then we restrict this action and prompt that you have not created this post, so you cannot update this post
// else we update this post


router.put("/:id",async(req,res)=>{

    try{
        const tempPost = await Post.findById(req.params.id);
        if(tempPost.userId == req.body.userId){
            await tempPost.updateOne({$set:req.body});
            res.status(200).json("Post updated successfully!");
        }else{
            res.status(501).json("You have not created this post so you cannot update this post!")
        }
    }catch(err){
        res.status(404).json(err);
    }
    

})

// getting a post

router.get("/:id",async(req,res)=>{
    try{
        const tempPost = await Post.findById(req.params.id);
        const {userId,_id,bio,likes,...others} = tempPost;
        res.status(200).json({userId,_id,bio,likes});
    }catch(err){    
        res.status(404).json(err);
    }
})

// deleting a post

// liking a post

// getting all posts of user's followings


module.exports = router; 