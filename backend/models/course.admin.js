const mongoose = require('mongoose');

// Schema for each lesson
const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the lesson
  content: { type: String, required: true }, // Content of the lesson (could be rich text or markdown)
  media: { type: String }, // Optional media link (like video or image URL)
  quiz: [{
    question: { type: String, required: true }, // Question for quiz
    options: [{ type: String }], // Array of options for multiple-choice questions
    correctAnswer: { type: String, required: true }, // Correct answer
  }],
  order: { type: Number, required: true }, // Ordering of lessons in the course
}, { timestamps: true });

// Main course schema
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Course title
  description: { type: String, required: true }, // Course description
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to instructor (User model)
  category: { type: String, required: true }, // Category of the course (e.g., "Programming", "Mathematics")
  lessons: [lessonSchema], // Array of lessons
  duration: { type: String }, // Duration (e.g., "4 hours")
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true }, // Difficulty level
  price: { type: Number, default: 0 }, // Price of the course (could be free or paid)
  createdAt: { type: Date, default: Date.now }, // Creation date
  updatedAt: { type: Date, default: Date.now }, // Update date
  isPublished: { type: Boolean, default: false }, // To track if the course is live
}, { timestamps: true });

// Create Course model
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
