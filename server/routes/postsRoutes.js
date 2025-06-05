//routes/postRoutes.js
const express = require("express");
const { createPost, getPosts, deletePost } = require("../controllers/postController");  // Import the controller method
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


// Protect the route
// router.post("/posts", protect, createPost);
router.post("/", protect, createPost);
router.get('/', getPosts);    
router.delete("/:id", protect, deletePost);

module.exports = router;



