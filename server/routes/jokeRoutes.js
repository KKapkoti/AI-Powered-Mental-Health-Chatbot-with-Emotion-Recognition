// In routes/jokeRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/joke', async (req, res) => {
  try {
    // const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke', { timeout: 5000 });
    if (response.status !== 200) {
      return res.status(response.status).json({ error: `API returned status ${response.status}` });
    }
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching joke:', err);  // Log the error details
    res.status(500).json({ error: 'Failed to fetch joke', details: err.message });
  }
});

module.exports = router;


