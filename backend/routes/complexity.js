// src/routes/complexity.route.js

const express = require('express');
const router = express.Router();
const { analyzeComplexity } = require('../controllers/compiler.complexity');

// Route to analyze complexity of code
router.post('/analyze', analyzeComplexity);

module.exports = router;
