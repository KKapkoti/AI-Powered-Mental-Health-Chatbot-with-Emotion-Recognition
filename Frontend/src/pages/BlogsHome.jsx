//src/pages/BlogsHome.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from 'react-toastify';
function Blogs() {
const [postLists, setPostList] = useState([]);
const { user, isAuth } = useAuth();
const userId = user?._id;

const backgroundColors = [
  "#fcf4dd", 
  "#ddedea",
  "#e8dff5", 
  "#fce1e4", 
  "#daeaf6", 
];

useEffect(() => {
  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts");
      const data = await response.json();
      console.log("Fetched Posts:", data);
      setPostList(data.reverse());
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };
  getPosts();

  if (user) {
    console.log("Logged-in user ID:", user._id);
    // getPosts();
  }
},[user]);
// },[]);
const deletePost = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this post?");
  if (!confirmDelete) return;
  try {
    const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Added token header
      },
    });
  const result = await response.json();

    if (response.ok) {
      toast.success(result.message); // Show success message with toast
      setPostList((prevPosts) => prevPosts.filter((post) => post._id !== id)); // Remove deleted post from state
    } else {
      toast.error(result.message); // Show error message with toast
    }
  } catch (err) {
    console.error("Failed to delete post", err);
    toast.error("Failed to delete post"); // Show a generic error message
  }
};


return (
  <div className="blogsPage">
    {postLists.map((post, index) => {
      const backgroundColor = backgroundColors[index % backgroundColors.length];
      console.log("Post author ID:", post.author?._id);
      console.log("Logged-in user ID:", userId);
      return (
        <div className="post" key={post._id} style={{ backgroundColor }}>
          <div className="postHeader">
            <div className="title">
              <h2>{post.title}</h2>
            </div>
            <div className="deletePost">
                {isAuth && post.author?._id === userId && (
                <button
                  onClick={() => deletePost(post._id)}
                  className="ml-4 px-3 py-1 bg-red-500 text-blue text-sm font-semibold rounded hover:bg-red-600 transition duration-200">
                    &#128465;
                  </button>
                )}
            </div>
          </div>
          <div className="postTextContainer">{post.postText}</div>
          <h3 className="postAuthor">@{post.author?.name || "Unknown"}</h3>
        </div>
      );
    })}
  </div>
);
}

export default Blogs;
