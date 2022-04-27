const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
// all user operations ,, CRUD here

//update user
router.put("/:id", async (req, res) => {
  //if (req.body.userId === req.params.id || req.body.isAdmin) { // check if user is allowed to update account
    if (req.body.password) {
      try { // update password and reencrypt
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try { // find the user and update
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json("Account has been updated!");
    } catch (err) {
      return res.status(500).json(err);
    }
 /* } else { // user does not have access
    return res.status(403).json("Access Restricted!");
  }*/
});

//delete user
router.delete("/:id", async (req, res) => { // check if user is allowed to update account
  //if (req.body.userId === req.params.id || req.body.isAdmin) {
    try { // find the user and delete
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  //} else { // user does not have access
   // return res.status(403).json("Access Restricted!");
  //}
});

//get a user
/*
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user){
      return res.status(500).json("user does not exist!");
    }else{
      const { password, updatedAt, ...other } = user._doc;  // other is all fields but password and updatedAt
      return res.status(200).json(other);
    }
   
  } catch (err) {
    //return res.status(500).json(err);
    return res.status(500).json("user does not exist!"); // this should not be how this code works yo!
  }
});
*/
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) { // can't follow yourself
    try {
      const user = await User.findById(req.params.id); // user you want to follow --> localhost: contains who you want to follow
      const currentUser = await User.findById(req.body.userId); // yourself
      if (!user.followers.includes(req.body.userId)) { // user must be someone you don't already follow
        await user.updateOne({ $push: { followers: req.body.userId } }); // update other user's followers array
        await currentUser.updateOne({ $push: { followings: req.params.id } }); // update your following array
        return res.status(200).json("User has been followed!");
      } else {
        return res.status(403).json("You already follow this user!");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can't follow yourself silly!");
  }
});

//follow a topic -> added now
router.put("/:id/followTopic", async (req, res) => {
  
    try {
      
      const currentUser = await User.findById(req.body.userId); // yourself
      if (!currentUser.topicsFollowed.includes(req.params.id)) { // user must be someone you don't already follow
        await currentUser.updateOne({ $push: { topicsFollowed: req.params.id } }); // update your following array
        return res.status(200).json("Topic has been followed!");
      } else {
        return res.status(403).json("You already follow this topic!");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
 
});

// get all of the user's friends
router.get("/friends/:userId", async (req, res) => {

  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/topicsFollowing/:userId", async (req, res) => { // get all topics user follows
  try {
    const user = await User.findById(req.params.userId); // current user
    
    const topics = await Promise.all(
      user.topicsFollowed.map((topic) => {
        return User.findById(topic);
      })
    );
    let topicList = [];
    topics.map((topic1) => {
      const { _id, username, profilePicture } = topic1;
      topicList.push({ _id, username, profilePicture });
    });
   
    res.status(200).json(topicList)
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/savedPosts/:username", async (req, res) => { // get all saved posts of user
  console.log("PARAMS=")
  console.log(req.params.username);
  
  try {
    const user = await User.findOne({ username: req.params.username }); // current user
    
    const savedPosts1 = await Promise.all(
      user.savedPosts.map((savedPost) => {
        return Post.findById(savedPost);
      })
    );
    let savedPostList = [];
    console.log(" here" +user.username)
    savedPosts1.map((savedPost1) => {
      //const { _id, userId, topic, desc, img, likes, comments } = topic1;
      savedPostList.push(savedPost1);
    });
    res.status(200).json(savedPostList)
  } catch (err) {
    res.status(450).json(err);
  }
});

//save a post -> added now
router.put("/:id/savePost", async (req, res) => {
  
  console.log("test params")
    console.log(req.params.id);

    console.log("test body")
    console.log(req.body.id);
  try {
    const currentUser = await User.findById(req.params.id); // yourself
    
    if (!currentUser.savedPosts.includes(req.body.id)) { //  can't save same post twice
      console.log("entered save post if")
      await currentUser.updateOne({ $push: { savedPosts: req.body.id } }); // update savedPosts array
      console.log(currentUser.savedPosts)
      return res.status(200).json("Post has been saved!");
    } else {
      return res.status(457).json("This post is already saved");
    }
  } catch (err) {
    return res.status(600).json(err);
  }

});

router.put("/:id/LikePost", async (req, res) => {
  
  console.log("test params")
    console.log(req.params.id);

    console.log("test body")
    console.log(req.body.id);
  try {
    const currentUser = await User.findById(req.params.id); // yourself
    console.log(currentUser);
    if (!currentUser.interactions.includes(req.body.id)) { //  can't save same post twice
      console.log("entered save post if")
      await currentUser.updateOne({ $push: { interactions: req.body.id } }); // update savedPosts array
      //console.log(currentUser.savedPosts)
      return res.status(200).json("Post has been added!");
    } else {
      return res.status(457).json("This post is already added");
    }
  } catch (err) {
    return res.status(600).json(err);
  }

});

// unsave post
router.put("/:id/unsavePost", async (req, res) => {
   
  try {
    const currentUser = await User.findById(req.params.id); // yourself
    if (currentUser.savedPosts.includes(req.body.id)) {//  post must already be saved
      console.log("entered unsave post if")
      await currentUser.updateOne({ $pull: { savedPosts: req.body.id } }); // remove from saved posts
      return res.status(200).json("Post has been unsaved");
    } else {
      return res.status(403).json("You haven't saved this post");
    }
  } catch (err) {
    return res.status(500).json(err);
  }

});

router.put("/:id/unLikePost", async (req, res) => {
   
  try {
    const currentUser = await User.findById(req.params.id); // yourself
    if (currentUser.interactions.includes(req.body.id)) {//  post must already be saved
      const post = await Post.findById(req.body.id);
      let flag = 0
      for(let i = 0; i < post.comments.length; i++) {
        if(post.comments[i].username == currentUser.username) {
          flag = 1
        }
      }
      console.log("entered unsave post if")
      if(flag == 0 ) {
        await currentUser.updateOne({ $pull: { interactions: req.body.id } }); // remove from saved posts
      return res.status(200).json("Post has been unliked");
      } else {
        return res.status(200).json("There is a comment");
      }
      
      return res.status(200).json("Post has been unliked");
    } else {
      return res.status(403).json("You haven't liked this post");
    }
  } catch (err) {
    return res.status(500).json(err);
  }

});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) { // can't unfollow yourself
      try {
        const user = await User.findById(req.params.id); // user you want to unfollow  --> localhost: contains who you want to unfollow
        const currentUser = await User.findById(req.body.userId); // yourself
        if (user.followers.includes(req.body.userId)) { // user must be someone you follow
          await user.updateOne({ $pull: { followers: req.body.userId } }); // remove from other user's followers array
          await currentUser.updateOne({ $pull: { followings: req.params.id } }); // remove from your following array
          return res.status(200).json("User has been unfollowed!");
        } else {
          return res.status(403).json("You dont follow this user!");
        }
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can't unfollow yourself silly!");
    }
  });


  //unfollow a topic
router.put("/:id/unfollowTopic", async (req, res) => {
   
    try {
      const currentUser = await User.findById(req.body.userId); // yourself
      if (currentUser.topicsFollowed.includes(req.params.id)) {// user must be someone you follow
        await currentUser.updateOne({ $pull: { topicsFollowed: req.params.id } }); // remove from your following array
        return res.status(200).json("Topic has been unfollowed!");
      } else {
        return res.status(403).json("You dont follow this topic!");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  
});

module.exports = router;