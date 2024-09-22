// src/lib/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.example.com',  // Base URL
    timeout: 1000,  // Request timeout
});

export default axiosInstance;
