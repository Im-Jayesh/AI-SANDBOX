// src/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');  // Import the MongoDB connection logic

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend runs on port 5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Allows cookies, if needed
}));
app.use(express.json()); // Body parser for JSON

// Connect to MongoDB
connectDB();  // Call the function to connect to the database

// Routes
app.use('/api/auth', require('./routes/auth'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
