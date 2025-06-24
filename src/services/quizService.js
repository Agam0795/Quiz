import api from './api';

// Get all quizzes
export const getQuizzes = async () => {
  try {
    const response = await api.get('/quizzes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a single quiz by ID
export const getQuiz = async (id) => {
  try {
    const response = await api.get(`/quizzes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new quiz
export const createQuiz = async (quizData) => {
  try {
    const response = await api.post('/quizzes', quizData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing quiz
export const updateQuiz = async (id, quizData) => {
  try {
    const response = await api.put(`/quizzes/${id}`, quizData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a quiz
export const deleteQuiz = async (id) => {
  try {
    const response = await api.delete(`/quizzes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
