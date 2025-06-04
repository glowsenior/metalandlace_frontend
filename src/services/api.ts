import axios from 'axios';

// API URL should be configured based on your environment
const API_URL = import.meta.env.DEV ? 'http://192.168.10.181:5000/api/v1' : '/api/v1';

// Create axios instance with base URL
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  },
});

// Add request interceptor to handle multipart/form-data requests
api.interceptors.request.use((config) => {
  // If the request contains FormData, remove the Content-Type header
  // to let the browser set it with the correct boundary
  if (
    config.data instanceof FormData
  ) {
    // Let axios set the content type with boundary
    delete config.headers['Content-Type'];
  }
  return config;
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