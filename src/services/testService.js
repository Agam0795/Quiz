import api from './api';

export const startTest = async () => {
  try {
    const response = await api.post('/tests/start');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const submitTest = async (testId, answers) => {
  try {
    const response = await api.post(`/tests/${testId}/submit`, { answers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserTests = async () => {
  try {
    const response = await api.get('/tests/user');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTestResult = async (testId) => {
  try {
    const response = await api.get(`/tests/${testId}/result`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStats = async () => {
  try {
    const response = await api.get('/tests/stats');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTests = async (filters) => {
  try {
    const response = await api.get('/tests', { params: filters });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const exportTestResults = async (filters) => {
  try {
    const response = await api.get('/tests/export', {
      params: filters,
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};