// src/components/Nav.jsx
import React from 'react';
import { Link } from 'react-router-dom';  // Assuming you're using React Router for navigation

function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/compiler">Compiler</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;
