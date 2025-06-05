//src/pages/OauthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; 

const OauthSuccess = () => {
  const navigate = useNavigate();
  // const { setIsAuth, setUser } = useAuth();
  const { setIsAuth } = useAuth();

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(window.location.search);
  //   const token = queryParams.get('token');

  //   if (token) {
  //     // Save token to localStorage
  //     localStorage.setItem("token", token);
  //     console.log("✅ OAuth Token saved!");
  //     setIsAuth(true); 
  //     // Redirect to homepage 
  //     navigate("/");
  //   } else {
  //     console.error("No token found in URL.");
  //     navigate("/login");
  //   }
  // }, [navigate, setIsAuth]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
  
    console.log("Full URL:", window.location.href);
    console.log("Extracted token:", token);

   // Only handle if token exists in the URL
   if (token) {
    localStorage.setItem("token", token);
    console.log("✅ OAuth Token saved!");
    setIsAuth(true);

     // 🔴 Fetch user profile using token
     const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user profile");

       // You can optionally extract user data here
       const data = await response.json();
       console.log("User profile fetched:", data);

       // Optional: setUser(data) if you're tracking user info
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
    // Slight delay to ensure AuthContext updates before navigating
    setTimeout(() => {
      navigate("/");
    }, 100);
  }
};

fetchUserProfile();
} else {
      // Avoid acting on second render after redirect
      if (!localStorage.getItem("token")) {
        console.error("No token found in URL.");
        navigate("/login");
      }
    }
  }, [navigate, setIsAuth]);
  
  return <div>
    <h2>OAuth Success</h2>
      <p>You have successfully logged in!</p>
    </div>;
};

export default OauthSuccess;
