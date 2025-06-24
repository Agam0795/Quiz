import React, { useState, useEffect } from 'react';
import { getQuizzes, createQuiz, updateQuiz, deleteQuiz } from '../services/quizService';

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 30, // in minutes
    isActive: true,
    questions: []
  });

  // Load quizzes on component mount
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch (err) {
        setError('Failed to load quizzes. Please try again later.');
        console.error('Error fetching quizzes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingQuiz) {
        await updateQuiz(editingQuiz._id, formData);
      } else {
        await createQuiz(formData);
      }
      // Refresh the quizzes list
      const data = await getQuizzes();
      setQuizzes(data);
      // Reset form
      setFormData({
        title: '',
        description: '',
        duration: 30,
        isActive: true,
        questions: []
      });
      setEditingQuiz(null);
      setShowForm(false);
    } catch (err) {
      setError('Failed to save quiz. Please try again.');
      console.error('Error saving quiz:', err);
    }
  };

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz);
    setFormData({
      title: quiz.title,
      description: quiz.description,
      duration: quiz.duration,
      isActive: quiz.isActive,
      questions: [...quiz.questions]
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await deleteQuiz(id);
        setQuizzes(quizzes.filter(quiz => quiz._id !== id));
      } catch (err) {
        setError('Failed to delete quiz. Please try again.');
        console.error('Error deleting quiz:', err);
      }
    }
  };

  if (loading) return <div className="text-center p-8">Loading quizzes...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Quizzes</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {showForm ? 'Cancel' : 'Create New Quiz'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            {editingQuiz ? 'Edit Quiz' : 'Create New Quiz'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  Active Quiz
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingQuiz(null);
                  setFormData({
                    title: '',
                    description: '',
                    duration: 30,
                    isActive: true,
                    questions: []
                  });
                }}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                {editingQuiz ? 'Update Quiz' : 'Create Quiz'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Quizzes</h3>
        {quizzes.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p>No quizzes found. Create your first quiz!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {quizzes.map((quiz) => (
              <div key={quiz._id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg">{quiz.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{quiz.description}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <span className="mr-4">Duration: {quiz.duration} min</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        quiz.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {quiz.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(quiz)}
                      className="text-indigo-600 hover:text-indigo-800"
                      title="Edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(quiz._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizManagement;
