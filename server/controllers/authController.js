//controllers/authController.js
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { generateToken, verifyToken } = require('../config/jwt');

// User Signup
exports.signUp = async (req, res, next) => {
    const { username, email, password, age } = req.body;
    try {
        console.log("🔹 Received Signup Request:", { username, email, password });
       // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered! Please log in." });
    }
         // Hash password
         const salt = await bcrypt.genSalt(10);
         console.log("🔹 Generated Salt:", salt);

         const hashedPassword = await bcrypt.hash(password, salt);
         console.log("🔹 Hashed Password:", hashedPassword);
 
        const user = new User({
            username,
            email,
            password: hashedPassword,
            age
        });

        // ✅ Generate Token
        const token = generateToken(user._id);
        await user.save();
        console.log("✅ User Saved:", user);

        res.status(201).json({ 
                sucess: true,
                message: "User registered successfully",
                 token,
                    user: {
                        id: user._id,
                        name: user.username,
                        email: user.email,
                        age: user.age,
                },
             });
    } catch (error) {
        console.error("Error in signUp:", error);
        next(error);
    }
};

// User Login
exports.loginUser = async (req, res, next) => {

        const { email, password } = req.body; 

        console.log("Received Login Request for Email:", email);
        try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found. Please sign up first." });
        }

        console.log("Stored Hashed Password:", user.password);
        console.log("Entered Raw Password:", password);


        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        //  Now generate token (AFTER checking userExist is defined)
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
             message: "Login successful",
             token, 
             user: {
                id: user._id,
                name: user.username,
                email: user.email,
                age: user.age,
     },
     });
    } catch (error) {
        console.error("Error in loginUser:", error);
        next(error);
    }
};

exports.logout = (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Logout error", error: err });
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.status(200).json({ message: "Logged out successfully" });
      });
    });
  };
  


// Get User Profile
exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// Update User Profile
exports.updateUserProfile = async (req, res, next) => {
    const { username, email } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, { username, email }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};


//user Progress
exports.getUserProgress = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};


// Delete User
exports.deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

