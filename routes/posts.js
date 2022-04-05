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
        if(!tempPost){
            return res.status(404).json("No such post exists!");
        }
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

// first of all we check whether there exists post with id as params.id or not
// if not then we restrict this action and prompt that no such post exists
// else we get the post by findById

router.get("/:id",async(req,res)=>{
    try{
        const tempPost = await Post.findById(req.params.id);
        if(!tempPost)
        {
            return res.status(404).json("No such post exists!");
        }
        const {userId,_id,bio,likes,...others} = tempPost;
        res.status(200).json({userId,_id,bio,likes});
    }catch(err){    
        res.status(404).json(err);
    }
})

// deleting a post


// first of all we check whether there exists post with id as params.id or not
// if not then we restrict this action and prompt that no such post exists
// else
// for deleting we firstly check whether the post is created by user with body.userId or not
// if not then we restrict this action and prompt that you have not created this post so you cannot delete this post
// else we simply find the post by params.id and delete this post

router.delete("/:id",async(req,res)=>{
    try{
        const tempPost = await Post.findById(req.params.id);
        if(!tempPost){
            return res.status(404).json("No such post exists!");
        }
        if(tempPost.userId==req.body.userId){
            await tempPost.deleteOne();
            res.status(200).json("Post deleted successfully!");
        }else{
            res.status(501).json("You have not created this post so you cannot delete this post!");
        }
    }catch(err){
        res.status(404).json(err);
    }
})

// liking a post

router.put("/:id/like",async(req,res)=>{

})

// getting all posts of user's followings


module.exports = router; 