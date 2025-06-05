//controllers/postController.js
const Post = require("../models/Post");  // Import the Post model
// const { verifyToken } = require('../config/jwt');
const { generateToken, verifyToken } = require('../config/jwt');

// Create a new post
exports.createPost = async (req, res) => {
  try {
  const { title, postText } = req.body;
  console.log("User making the post:", req.user);
    // Create a new post in the MongoDB collection
    const newPost = new Post({
      title,
      postText,
      author: {
        id: req.user._id,
        name: req.user.username,
      },
    });

    // Save the post to MongoDB
    await newPost.save();
    
    return res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ message: "Error creating post", error: error.message });
  }
};



exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("author", "_id name");// if you have a userId reference
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};



exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id; 
    //  Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
     // Check if logged-in user is the author
     if (post.author.id.toString() !== userId.toString()) {
      return res.status(401).json({ message: "You are not authorized to delete this post" });
    }
    // Check if logged-in user is the author
    if (post.author.id.toString() !== userId.toString()) {
      return res.status(401).json({ message: "You are not authorized to delete this post" });
    }
    // Delete the post
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error" });
  }
};


