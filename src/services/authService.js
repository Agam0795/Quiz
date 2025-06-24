import api from './api';

export const login = async (username, password, role) => {
  console.log('Making API call to /auth/login with:', { username, password, role });
  try {
    const response = await api.post('/auth/login', { username, password, role });
    console.log('API response received:', response);
    return response.data;
  } catch (error) {
    console.error('API call to /auth/login failed:', error.response || error);
    throw error.response?.data?.message || 'Login failed';
  }
};

export const register = async (username, password, role) => {
  try {
    const response = await api.post('/auth/register', { username, password, role });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

export const getUser = async () => {
  try {
    const response = await api.get('/auth/user');
    return response;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post('/auth/refresh');
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/auth/profile', userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await api.put('/auth/password', passwordData);
    return response;
  } catch (error) {
    throw error;
  }
}; 