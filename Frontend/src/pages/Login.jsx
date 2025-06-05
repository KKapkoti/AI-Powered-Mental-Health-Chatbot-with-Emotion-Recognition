
//src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
const LoginSignup = () => {
  const { setIsAuth, setUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    try {
      const response = await axios.post(endpoint, formData, { withCredentials: true });
        const data = response.data;
        if (response.status === 200) {
        localStorage.setItem("isAuth", true);
        localStorage.setItem("user", JSON.stringify(data.user)); 
        localStorage.setItem("token", data.token); //add in last
        setIsAuth(true);
        setUser(data.user);
        navigate("/");
      } else {
        alert(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("Authentication error: " + error.message);
    }
  };
  const signInWithGoogle = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };
  const handleLogOutClick = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      localStorage.clear();
      setIsAuth(false);
      navigate("/login"); // or redirect manually
    } catch (err) {
      console.error("Logout error", err);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="logo-leaf">🍃</div>
        <h2>{isLogin ? "Mental Health Support" : "Create an Account"}</h2>
        <p>{isLogin ? "Login" : "Join us for better mental wellness"}</p>

        <div className="tab-switch">
          <span className={isLogin ? "active-tab" : ""} onClick={() => setIsLogin(true)}>
            Login
          </span>
          <span className={!isLogin ? "active-tab" : ""} onClick={() => setIsLogin(false)}>
            Sign Up
          </span>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit">{isLogin ? "Log in" : "Sign Up"}</button>
        </form>
        <p className="or-line">or</p>
        <button className="google-btn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
        {isLogin ? (
          <p className="switch-info">
            Don't have an account? <span onClick={() => setIsLogin(false)}>Sign up</span>
          </p>
        ) : (
          <p className="switch-info">
            Already have an account? <span onClick={() => setIsLogin(true)}>Log in</span>
          </p>
        )}
      </div>
    </div>
  );
};
export default LoginSignup;

