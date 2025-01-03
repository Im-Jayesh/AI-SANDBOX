// routes/visualization.js
const express = require('express');
const router = express.Router();
const { executePythonCode, executionSteps, currentIndex } = require('../controllers/visualization.controller');

router.post('/submit', async (req, res) => {
    const { code } = req.body;

    try {
        await executePythonCode(code);
        res.json({ success: true, steps: executionSteps.length });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

router.get('/step', (req, res) => {
    if (currentIndex >= 0 && currentIndex < executionSteps.length) {
        res.json(executionSteps[currentIndex]);
    } else {
        res.json({ error: "Step out of range" });
    }
});

router.post('/navigate', (req, res) => {
    const { action } = req.body;
    if (action === "next" && currentIndex < executionSteps.length - 1) {
        currentIndex++;
    } else if (action === "previous" && currentIndex > 0) {
        currentIndex--;
    }
    res.json({ success: true });
});

module.exports = router;
