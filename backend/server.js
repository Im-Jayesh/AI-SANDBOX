const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // MongoDB connection
const bodyParser = require("body-parser");
const path = require('path'); // Path module for handling file paths

// Routes
const compilerRoutes = require('./routes/compiler');
const complexityRoutes = require('./routes/complexity');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the 'views' directory for EJS templates

// Middleware setup
app.use(cors({
  origin: 'http://localhost:5173', // Frontend runs on port 5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allows cookies, if needed
}));
app.use(express.json()); // Body parser for JSON
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (CSS, JS)

// Connect to MongoDB
connectDB(); // Call the function to connect to the database

// API Routes
app.use('/api/compiler', compilerRoutes); // Compiler route
app.use('/api/complexity', complexityRoutes); // Complexity analysis route

// Serve the index.ejs page for the root route
app.get('/', (req, res) => {
    res.render('index'); // Render the index.ejs template
});

// Catch-all for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
