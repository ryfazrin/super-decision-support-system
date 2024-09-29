// src/lib/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://ec2-3-26-197-201.ap-southeast-2.compute.amazonaws.com:8080',  // Base URL
    timeout: 1000,  // Request timeout
});

export default axiosInstance;
