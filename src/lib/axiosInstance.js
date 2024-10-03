// src/lib/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://zulvani.tech:8080',  // Base URL
    timeout: 1000,  // Request timeout
});

export default axiosInstance;
