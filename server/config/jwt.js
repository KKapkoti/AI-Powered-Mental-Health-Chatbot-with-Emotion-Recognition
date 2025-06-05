//config/jwt.js
// console.log("JWT Secret:", process.env.JWT_SECRET);
const jwt = require('jsonwebtoken');

// const generateToken = (id) => {
//     // return jwt.sign({ id }, process.env.JWT_SECRET || 'defaultsecret', { 
//         return jwt.sign({ id }, process.env.JWT_SECRET, {
//       expiresIn: "30d" 
//     });
// };
// module.exports = generateToken;



// Generate token
const generateToken = (user) => {
  return jwt.sign(
      { 
        id: user._id, 
        name: user.name,
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
  );
};

// Verify token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};


module.exports = { generateToken, verifyToken };