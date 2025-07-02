import axios from 'axios';

const API_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000, // Increased to 10 second timeout for better reliability
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to include auth token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('quizmaster_token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Add response interceptor to handle token expiration and timeout errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.warn('Request timeout - API is taking too long to respond');
            // Add more specific timeout error handling
            error.isTimeout = true;
            error.message = 'Connection timeout: The server is taking too long to respond';
        }
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('quizmaster_token');
            localStorage.removeItem('quizmaster_user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth
export const login = (email, password) => api.post('/users/login', { email, password });
export const register = (name, email, password) => api.post('/users/register', { name, email, password });
export const getUser = () => api.get('/users/user');
export const googleAuth = () => window.location.href = `${API_URL.replace('/api', '')}/api/auth/google`;

// Password Reset
export const sendPasswordResetEmail = (email) => api.post('/users/forgot-password', { email });
export const resetPassword = (token, password) => api.post('/users/reset-password', { token, password });

// Quiz Invitations
export const sendQuizInvitation = (quizId, invitationData) => api.post(`/quizzes/${quizId}/invite`, invitationData);

// Quizzes
export const getQuizzes = (params = {}) => api.get('/quizzes', { params });
export const getUserQuizzes = (userId) => api.get(`/quizzes/user/${userId}`);
export const getQuiz = (id) => api.get(`/quizzes/${id}`);
export const getQuizByShareId = (shareId) => api.get(`/quizzes/share/${shareId}`);
export const getQuizCategories = () => api.get('/quizzes/categories');
export const createQuiz = (quizData) => api.post('/quizzes', quizData);
export const updateQuiz = (id, quizData) => api.put(`/quizzes/${id}`, quizData);
export const deleteQuiz = (id) => api.delete(`/quizzes/${id}`);
export const shareQuiz = (id) => api.post(`/quizzes/${id}/share`);
export const addCollaborator = (id, collaboratorData) => api.post(`/quizzes/${id}/collaborators`, collaboratorData);

// Scores
export const getScoresForQuiz = (quizId) => api.get(`/scores/quiz/${quizId}`);
export const getScoresForUser = (userId) => api.get(`/scores/user/${userId}`);
export const postScore = (scoreData) => api.post('/scores', scoreData);
export const submitScore = (scoreData) => api.post('/scores', scoreData);
export const getLeaderboard = (params = {}) => api.get('/scores/leaderboard', { params });

// Public Quiz
export const getPublicQuiz = (shareId) => api.get(`/quizzes/public/${shareId}`);

// Analytics
export const getAnalytics = (params = {}) => api.get('/analytics', { params });

// Profile Management
export const updateProfile = (profileData) => api.put('/users/profile', profileData);
export const changePassword = (passwordData) => api.put('/users/password', passwordData);
export const deleteAccount = () => api.delete('/users/account');

// Media uploads
export const uploadMedia = (formData) => {
    return api.post('/uploads/media', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

// Specific upload functions for different media types
export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('media', file);
    formData.append('type', 'image');
    return uploadMedia(formData);
};

export const uploadVideo = (file) => {
    const formData = new FormData();
    formData.append('media', file);
    formData.append('type', 'video');
    return uploadMedia(formData);
};

export const deleteMedia = (filename) => api.delete(`/uploads/media/${filename}`);

// Utility functions for token management
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('quizmaster_token', token);
        api.defaults.headers.common['x-auth-token'] = token;
    } else {
        localStorage.removeItem('quizmaster_token');
        delete api.defaults.headers.common['x-auth-token'];
    }
};

export const setUser = (user) => {
    if (user) {
        localStorage.setItem('quizmaster_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('quizmaster_user');
    }
};

export const getStoredUser = () => {
    const user = localStorage.getItem('quizmaster_user');
    return user ? JSON.parse(user) : null;
};

export const getStoredToken = () => {
    return localStorage.getItem('quizmaster_token');
};

export const logout = () => {
    localStorage.removeItem('quizmaster_token');
    localStorage.removeItem('quizmaster_user');
    delete api.defaults.headers.common['x-auth-token'];
};

export default api;