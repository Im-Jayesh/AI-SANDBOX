// Ye kisne banai hai? Jisnebhi banai ho wo dekhle bhai kay hai iska rakhna hai ya nahi 
// yaha bohot same naam ka ho gaya hai please

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from the backend API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/course'); // Adjust the API URL if necessary
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Display loading state or error message
  if (loading) {
    return <div style={styles.loading}>Loading courses...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.courseList}>
      <h1 style={styles.header}>Courses</h1>
      {courses.length === 0 ? (
        <p style={styles.noCourses}>No courses available at the moment.</p>
      ) : (
        <ul style={styles.courseItems}>
          {courses.map(course => (
            <li key={course._id} style={styles.courseItem}>
              <h2 style={styles.courseName}>{course.name}</h2>
              <p style={styles.courseDescription}>{course.description}</p>
              <p style={styles.courseInstructor}>Instructor: {course.instructor}</p>
              <p style={styles.courseDetails}>Duration: {course.duration} hours</p>
              <p style={styles.courseDetails}>Price: ${course.price}</p>
              <p style={styles.courseDetails}>Difficulty: {course.difficulty}</p>
              <p style={styles.courseDetails}>Category: {course.category}</p>
              <p style={styles.courseStatus}>
                Status: {course.isPublished ? 'Published' : 'Unpublished'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Inline CSS Styles
const styles = {
  courseList: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
  },
  courseItems: {
    listStyleType: 'none',
    padding: 0,
  },
  courseItem: {
    border: '1px solid #ddd',
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#fff',
  },
  courseName: {
    fontSize: '1.5rem',
    margin: '0 0 10px',
    color: '#555',
  },
  courseDescription: {
    fontSize: '1rem',
    color: '#777',
  },
  courseInstructor: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  courseDetails: {
    fontSize: '1rem',
    margin: '5px 0',
    color: '#555',
  },
  courseStatus: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  loading: {
    fontSize: '1.2rem',
    color: '#999',
    textAlign: 'center',
  },
  error: {
    fontSize: '1.2rem',
    color: 'red',
    textAlign: 'center',
  },
  noCourses: {
    fontSize: '1.2rem',
    color: '#999',
    textAlign: 'center',
  },
};

export default Course;
