import axios from 'axios';

// API URL should be configured based on your environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Create axios instance with base URL
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  },
});

export const setTockenApi = (token: string) => {
    api.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            } else {
                delete config.headers['Authorization'];
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
}

export default api;