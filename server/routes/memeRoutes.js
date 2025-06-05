//routes/memeRoutes.js
const express = require("express");
const router = express.Router();
const { generateMeme } = require("../controllers/memeController");

router.post("/generateMeme", generateMeme);

module.exports = router;
