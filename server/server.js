//server.js
require('dotenv').config();
const express = require('express');
const session = require("express-session");
const passport = require("passport");
require("./config/passport"); 
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const helmet = require('helmet');
const jokeRoutes = require('./routes/jokeRoutes');
const cookieParser = require("cookie-parser");

// Import Routes
const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postsRoutes');
const memeRoutes = require("./routes/memeRoutes");
// Middleware
const errorHandler  = require('./middleware/errorHandler');
const authMiddleware  = require('./middleware/authMiddleware');



// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Initialize app
const app = express();




app.use(session({
  // secret: "keyboard cat",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: "lax"
  }
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  // methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      // scriptSrc: ["'self'"], // Add if you use external scripts later
    },
  })
);


// Routes
app.use('/api', jokeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use("/api", memeRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


