// src/api/api.js
import axios from 'axios';

// Make sure the baseURL is set to the correct backend API route
const API = axios.create({
  baseURL: 'http://localhost:5000/api',  // This should point to your backend API
});

export default API;
