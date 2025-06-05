
//config/passport.js
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/User");
// const generateToken = require("../config/jwt");
const { generateToken } = require("../config/jwt");

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ googleId: profile.id });
      let user;
      if (existingUser) {
      user = existingUser;
    } else {
      user = await User.create({
      username: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id,
    });
  }
     const token = generateToken(user._id);
     return done(null, { user, token }); // Include token here
  } catch (err) {
    return done(err, null);
  }
}));


passport.serializeUser((user, done) => {
  done(null, { id: user.id, token: user.token });
});

passport.deserializeUser(async (userData, done) => {
  const user = await User.findById(userData.id);
  done(null, { user, token: userData.token });
});
