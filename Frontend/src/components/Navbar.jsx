//src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import MenuItems from "./MenuItems";
import getMenuItems from "../menuItems";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const {isAuth, setIsAuth, user} = useAuth(); 
  const menuItems = getMenuItems(isAuth); // Correct!

  const navigate = useNavigate();

  const handleLogOutClick = async () => {
    try{
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    localStorage.clear();
    setIsAuth(false);
    // window.location.pathname = "/";
    navigate("/");
  }
  catch (err) {
    console.error("Logout failed:", err);
  }
};
  


  return (
    <nav>
      <ul className="menus">
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
      <div className="menu-items">
        {!isAuth ? (
          <Link to="/login">Login</Link>
        ) : (
          <div className="auth-links">
            <Link to="/createpost">CreatePost</Link>
            <button className="LogOut-Button" onClick={handleLogOutClick}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
