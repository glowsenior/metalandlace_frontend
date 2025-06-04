
import { jwtDecode } from 'jwt-decode';
import { AuthResponse, LoginCredentials, RegisterCredentials, AuthUser } from '@/types/user';
import  api, { setTockenApi } from '@/services/api';


// Add interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper function to handle token storage
const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

// Helper function to remove token
const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Helper function to get current user from token
const getUserFromToken = (): AuthUser | null => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    const decoded = jwtDecode<{ user: AuthUser }>(token);
    return decoded.user;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Login user
const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    // In a real app, this would be an API call
    // For now, we'll simulate a successful login
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const { token, user } = response.data;
    
    // Store token and user in localStorage
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    setTockenApi(token); // Set token for future requests
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Register user
const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  try {
    // In a real app, this would be an API call
    // For now, we'll simulate a successful registration
    const response = await api.post<AuthResponse>('/auth/register', credentials);
    const { token, user } = response.data;
    
    // Store token and user in localStorage
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Logout user
const logout = () => {
  removeToken();
};

// Check if user is authenticated
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    // Check if token is expired
    const decoded = jwtDecode<{ exp: number }>(token);
    const currentTime = Date.now() / 1000;
    
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

// Get current user
const getCurrentUser = (): AuthUser | null => {
  if (!isAuthenticated()) return null;
  
  const userStr = localStorage.getItem('user');
  if (!userStr) {
    const user = getUserFromToken();
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }
    return null;
  }
  
  return JSON.parse(userStr);
};

// For development/testing - simulate successful auth responses
const simulateAuthResponse = (userData: Partial<AuthUser>): AuthResponse => {
  const user: AuthUser = {
    id: userData.id || '1',
    name: userData.name || 'Test User',
    email: userData.email || 'test@example.com',
    role: userData.role || 'user',
  };
  
  // Create a simple JWT-like token (not secure, just for testing)
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
    JSON.stringify({ user, exp: Math.floor(Date.now() / 1000) + 3600 })
  )}.SIGNATURE`;
  
  return { user, token };
};

// Mock login for development (remove in production)
const mockLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check credentials (in a real app, this would be done on the server)
  if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
    const response = simulateAuthResponse({
      email: credentials.email,
      role: 'admin',
      name: 'Admin User'
    });
    
    setToken(response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  }
  
  if (credentials.email && credentials.password) {
    const response = simulateAuthResponse({
      email: credentials.email,
      role: 'user',
      name: credentials.email.split('@')[0]
    });
    
    setToken(response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  }
  
  throw new Error('Invalid credentials');
};

// Mock register for development (remove in production)
const mockRegister = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validate password confirmation (this would normally be done on the server)
  if (credentials.password !== credentials.passwordConfirm) {
    throw new Error("Passwords don't match");
  }
  
  // Use name if provided, otherwise construct from firstName and lastName
  const name = credentials.name || `${credentials.firstName} ${credentials.lastName}`;
  
  const response = simulateAuthResponse({
    email: credentials.email,
    name: name,
    role: 'user'
  });
  
  setToken(response.token);
  localStorage.setItem('user', JSON.stringify(response.user));
  
  return response;
};

// Export the service
const authService = {
  login: login, //import.meta.env.DEV ? mockLogin : login,
  register: register, //import.meta.env.DEV ? mockRegister : register,
  logout,
  isAuthenticated,
  getCurrentUser,
  getToken: () => localStorage.getItem('token'),
};

export default authService;