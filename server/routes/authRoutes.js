//routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const { signUp, loginUser, logout, getUserProfile, updateUserProfile, getUserProgress, deleteUser } = require('../controllers/authController');
// const generateToken = require("../config/jwt");
const { generateToken } = require("../config/jwt");
const { protect } = require('../middleware/authMiddleware');

// Google OAuth
router.get("/google", 
  passport.authenticate("google", { 
  scope: ["profile", "email"] 
})
);

//Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // const token = generateToken(req.user._id);
    const token = req.user.token; //  Use the token already created in Passport
    // Set the JWT as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 30 days
    });
    // Redirect to frontend
     res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
  }
);


// User Registration Route
router.post('/register', signUp);

// User Login Route
router.post('/login', loginUser);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout error", error: err });
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // session cookie
      res.clearCookie("token"); // auth token cookie
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});


// Route to get user profile(Protected Route)
router.get('/profile', protect, getUserProfile);

// Route to update user profile
router.put('/profile/update', protect, updateUserProfile);

// Route to get user progress
router.get('/progress', protect, getUserProgress);

router.post('/delete', protect, deleteUser);


module.exports = router;




