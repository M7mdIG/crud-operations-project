// Load environment variables
require('dotenv').config();

// Import required libraries
const express = require('express');
const app = express();

// Import DB connection
const db = require('./db');

// Test database connection
db.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Database connected. Current time:', result.rows[0].now);
  }
});

// Use JSON middleware to parse request bodies
app.use(express.json());


// Load record routes
const recordRoutes = require('./routes/recordRoutes');
app.use('/api/records', recordRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
