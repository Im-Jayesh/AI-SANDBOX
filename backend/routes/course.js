const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

// Routes for courses
router.post('/courses', courseController.createCourse); // Create a new course
router.get('/courses', courseController.getAllCourses); // Get all courses
router.get('/courses/:id', courseController.getCourseById); // Get course by ID
router.put('/courses/:id', courseController.updateCourse); // Update course by ID
router.delete('/courses/:id', courseController.deleteCourse); // Delete course by ID

module.exports = router;
