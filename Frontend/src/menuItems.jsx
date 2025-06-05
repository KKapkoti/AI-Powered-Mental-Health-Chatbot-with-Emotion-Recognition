//src/menuItems.jsx
import React, { useState } from "react";
// const getMenuItems = () => [
  const getMenuItems = (isAuth) => [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Resources",
    submenu: [
      { title: "Articles", url: "articles" },
      { title: "Initiatives", url: "initiatives" },
    ],
  },
  {
    title: "Explore",
    submenu: [
      { title: "Blogs", url: "blogs" },
        // Conditionally render the Quiz link based on isAuth
      ...(isAuth ? [{ title: "Quiz", url: "quiz" }] : []),
      ...(isAuth ? [{ title: "Relax", url: "relax" }] : []),
      ...(isAuth ? [{ title: "Memes", url: "memes" }] : []),
      // ...(isAuth ? [{ title: "Doctor Consult", url: "doctor_consult" }] : []),
    ],
  },
  {
    title: "Help", url: "Doctor-consult" 
  },
  {
    title: "Contact",
    submenu: [
      { title: "About Us", url: "volunteer" },
      { title: "Contact Us", url: "contact" },
    ],
  },
];

export default getMenuItems;
