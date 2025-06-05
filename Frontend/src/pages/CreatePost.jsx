//src/CreatePost.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const createPost = async () => {
    const token = localStorage.getItem("token"); // Fetch token from localStorage
      if (!token) {
        console.log("User is not authenticated");
        navigate("/login");
        return;
      }
      try {
        // Send the token along with the post data
        const response = await axios.post(
          "http://localhost:5000/api/posts",  // Your backend endpoint
          { title, postText },
          {
            headers: {
              Authorization: `Bearer ${token}`,  // Send token in Authorization header
            },
          }
        );
       
        console.log("Post created:", response.data);
        toast.success("Post created successfully!");
        // Redirect after successful post creation
        navigate("/blogs");
      } catch (error) {
        console.error("Error creating post:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Failed to create post");
      }
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => setPostText(event.target.value)}
          />
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
