//models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // lowercase: true,
  },
  password: {
    type: String,
    // required: true,
  },
  //o-Auth
  googleId: {
    type: String,
  },
  //
  profilePicture: {
    type: String, // AWS S3 URL for profile picture
  },
  age: {
    type: Number,  // Add age for email/password registration
  },
  mentalHealthProgress: {
    moodTracking: [{
      emotion: String,
      timestamp: Date,
    }],
    sleepCycle: {
      hours: Number,
      date: Date,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model('User', userSchema);

