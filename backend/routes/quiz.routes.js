const express = require('express');
const router = express.Router();
const { generateQuiz } = require('../controllers/quiz.controller');

router.get('/generate-quiz/:lessonId', generateQuiz);

module.exports = router;
