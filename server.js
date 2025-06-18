// Load environment variables
require('dotenv').config();

// Import required libraries
const express = require('express');
const app = express();

// Use JSON middleware to parse request bodies
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
