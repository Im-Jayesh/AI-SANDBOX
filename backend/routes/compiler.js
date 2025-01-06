const express = require("express");
const router = express.Router();
const { runPythonCode } = require("../controllers/compiler.controller");  // Importing the function

// Define POST route for running Python code
router.post("/run", runPythonCode);  // This should work as long as the function is correctly exported

module.exports = router;
