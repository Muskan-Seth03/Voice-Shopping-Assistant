import api from './api';

// Description: Register a new user
// Endpoint: POST /api/auth/register
// Request: { email: string, password: string, firstName?: string, lastName?: string }
// Response: { message: string, user: User, accessToken: string, refreshToken: string }
export const registerUser = async (data: { email: string; password: string; firstName?: string; lastName?: string }) => {
  try {
    return await api.post('/api/auth/register', data);
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

// Description: Login user
// Endpoint: POST /api/auth/login
// Request: { email: string, password: string }
// Response: { message: string, user: User, accessToken: string, refreshToken: string }
export const loginUser = async (data: { email: string; password: string }) => {
  try {
    return await api.post('/api/auth/login', data);
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

// Description: Get current user profile
// Endpoint: GET /api/auth/me
// Request: {} (requires Authorization header)
// Response: { user: User }
export const getCurrentUser = async () => {
  try {
    return await api.get('/api/auth/me');
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

// Description: Logout user
// Endpoint: POST /api/auth/logout
// Request: {} (requires Authorization header)
// Response: { message: string }
export const logoutUser = async () => {
  try {
    return await api.post('/api/auth/logout');
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};