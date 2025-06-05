//src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Logoslider from "../components/Logoslider";
import Home_info from "../components/Home_info";
import img1 from "../images/homeimgnew-min.jpeg";
import EmotionSection from "./EmotionSection";
import BootstrapChatbot from "../components/BootstrapChatbot";
// import DoctorConsultation from "../components/DoctorConsultation"; 
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(true); // Track loading state
  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/joke'
      );
      setJoke(response.data.setup + " " + response.data.punchline);
      setLoading(false); // Set loading to false once the joke is fetched
    } catch (error) {
      console.error("Error fetching joke:", error);
      setLoading(false); // Set loading to false once the joke is fetched
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("isAuth");
    if (auth !== "true") {
      navigate("/", { replace: true });
    }
  // },[]);
 }, [navigate]);

  return (
    <div className="home-page">
      {/* Scrolling emoji marquee */}
  <div className="headline-container">
    <div className="marquee-text">
      🫶💚🤝☁️🌿🌈🧠✨🤲💫🧘🕊️🧘🏃‍♀️😤🎼🪷🗣️😄🌷🙌🍂🫶💚☁️🌿🌈🧠🗣️✨💫🧘😄🌷🙌🍂
    </div>
  </div>


      {/* Main content */}
      <div className="home-allcontent">
        {/* Hero Image */}
        <div className="home-project-intro-image">
          <img src={img1} alt="Sukoon: Embrace, Empower, Elevate" />
        </div>
        {/* Inspirational Quote */}
        <div className="home-project-intro-quote">
          <h3>
            "In the journey of life, may you find solace, laughter, and the
            companionship of kindred souls."
          </h3>
        </div>
        {/* Random Joke Section */}
        <div className="random-joke">
          <header className="random-joke-header">
            <blockquote>
              <h2>{joke}</h2>
            </blockquote>
          </header>
        </div>
        {/* Project Intro Text */}
        <div className="home-project-intro">
          <p>
            We hope you enjoy our jokes as much as we do. Wellness has many such
            resources to make you smile even when you feel you can't. We also
            offer a variety of other resources to help you understand yourself
            better. After all, we all deserve to know what is going on inside
            us.
          </p>
        </div>
        {/* Emotion Recognition Section */}
        <EmotionSection />
        {/* NGO Info Section */}
        <Home_info />

        {/* Logo Slider Section */}
        <Logoslider />
      </div>

      {/* Floating Chatbot Button */}
      <BootstrapChatbot />
    </div>
  );
};

export default Home;
