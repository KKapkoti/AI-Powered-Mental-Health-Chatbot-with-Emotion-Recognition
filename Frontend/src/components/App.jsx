//src/components/App.jsx
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CreatePost from "../pages/CreatePost";
import OauthSuccess from '../pages/OauthSuccess';
import LoginSignup from "../pages/Login";
import Blogs from "../pages/BlogsHome";
import Layout from "./Layout";
import Home from "../pages/Home";
import Articles from "../pages/Articles";
import Anxiety from "../pages/Anxiety";
import Depression from "../pages/Depression";
import Ocd from "../pages/Ocd";
import PanicDisorder from "../pages/PanicDisorder";
import BipolarArticle from "../pages/BipolarArticle";
import Schizophrenia from "../pages/Schizophrenia";
import Ptsd from "../pages/Ptsd";
import Psychosis from "../pages/Psychosis";
import Initiatives from "../pages/Initiatives";
import Quiz from "../pages/Quiz";
import Relax from "../pages/Relax";
import Memes from "../pages/Memes";
import DoctorConsult from "../pages/DoctorConsult";
import Volunteer from "../pages/Volunteer";
import ContactUs from "../pages/ContactUs";
import SignUp from "../pages/SignUp";
import AnxietyQuiz from "../pages/AnxietyQuiz";
import DepressionQuiz from "../pages/DepressionQuiz";
import OCDQuiz from "../pages/OcdQuiz";
import ADHDQuiz from "../pages/ADHDQuiz";
import SupportGroupsMain from "../pages/SupportGroupsMain";

const App = () => {
  const { isAuth, setIsAuth } = useAuth();
  const signUserOut = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      localStorage.clear();
      setIsAuth(false);
      // window.location.pathname = "/login";
      Navigate("./login")
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<Articles />} />
          <Route path="anxiety" element={<Anxiety />} />
          <Route path="depression" element={<Depression />} />
          <Route path="ocd" element={<Ocd />} />
          <Route path="panicdisorder" element={<PanicDisorder />} />
          <Route path="bipolar-article" element={<BipolarArticle />} />
          <Route path="schizophrenia" element={<Schizophrenia />} />
          <Route path="ptsd" element={<Ptsd />} />
          <Route path="psychosis" element={<Psychosis />} />
          <Route path="initiatives" element={<Initiatives />} />
          <Route path="support-groups" element={<SupportGroupsMain />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="quiz" element={isAuth ? <Quiz isAuth={isAuth} /> : <Navigate to="/login" />} />
          <Route path="anxiety-quiz" element={<AnxietyQuiz />} />
          <Route path="depression-quiz" element={<DepressionQuiz />} />
          <Route path="ocd-quiz" element={<OCDQuiz />} />
          <Route path="adhd-quiz" element={<ADHDQuiz />} /> 
          <Route path="relax" element={isAuth ? <Relax isAuth={isAuth}/> : <Navigate to="/login" />} />
          <Route path="memes" element={isAuth ? <Memes isAuth={isAuth} /> : <Navigate to="/login" />} />
          <Route path="Doctor-consult" element={<DoctorConsult />} />
          <Route path="volunteer" element={<Volunteer />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="/oauth-success" element={<OauthSuccess />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="createpost" element={isAuth ? <CreatePost isAuth={isAuth} /> : <Navigate to="/login" />}/>
          <Route path="login" element={isAuth ? <Navigate to="/" /> : <LoginSignup />} />
          {/* <Route path="login" element={<Login />} /> */}
        </Route>
      </Routes>
    </>
  );
};
export default App;
