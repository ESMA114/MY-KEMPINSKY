require('dotenv').config(); // .env load

const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json());

// Connect Database


// Test route
app.get('/', (req, res) => {
  res.send("Server is running ");
});

// Example route (fruits)
app.get('/fruits', (req, res) => {
  res.json({
    message: "Fruits API working"
  });
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});