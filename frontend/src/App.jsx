// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Course from './pages/Course';
import Compiler from './pages/Compiler'; // Importing Compiler page
import Nav from './components/Nav'; // Importing Nav component
import Footer from './components/Footer'; // Importing Footer component
import CP_Compiler from './pages/CP_Compiler';
import DSA_Page from './pages/Courses';
import "../src/assets/css/main.css"
import RenderCourse from './pages/RenderCourse';
import LessonsList from './pages/LessonsList';

const App = () => {
  return (
    <Router>
      <div className='main'>
        <Nav /> {/* Navigation bar */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/courses" element={<Course />} /> */}
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/cp_compiler/:problem_no" element={<CP_Compiler />} />
          <Route path='/courses' element={<DSA_Page />} />
          <Route path='/lesson/:lessonId' element={<RenderCourse />} />
          <Route path="/lessons/:courseId" element={<LessonsList />} />
          {/* Add more routes as needed */} 
        </Routes>

        
      </div>
    </Router>
  );
};

export default App;
