const Course = require('../models/course.admin'); // Import the Course model
const mongoose = require('mongoose');

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { name, description, instructor, category, lessons, duration, difficulty, price, isPublished } = req.body;

    // Create a new course instance
    const course = new Course({
      name,
      description,
      instructor,
      category,
      lessons,
      duration,
      difficulty,
      price,
      isPublished,
    });

    // Save the course to the database
    await course.save();
    
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
};

// Get all courses (can be paginated)
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
};

// Get a specific course by ID
exports.getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching course', error: error.message });
  }
};

// Update a course by ID
exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updates = req.body;

    // Find and update the course
    const course = await Course.findByIdAndUpdate(courseId, updates, { new: true });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
};

// Delete a course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
};
