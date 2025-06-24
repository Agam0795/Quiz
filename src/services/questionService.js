import api from './api';

export const getQuestions = async () => {
  try {
    const response = await api.get('/questions');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getQuestion = async (id) => {
  try {
    const response = await api.get(`/questions/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createQuestion = async (questionData) => {
  try {
    const response = await api.post('/questions', questionData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateQuestion = async (id, questionData) => {
  try {
    const response = await api.put(`/questions/${id}`, questionData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteQuestion = async (id) => {
  try {
    const response = await api.delete(`/questions/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const importQuestions = async (questionsFile) => {
  try {
    const formData = new FormData();
    formData.append('file', questionsFile);
    const response = await api.post('/questions/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const exportQuestions = async () => {
  try {
    const response = await api.get('/questions/export', {
      responseType: 'blob'
    });
    return response;
  } catch (error) {
    throw error;
  }
}; 