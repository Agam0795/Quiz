import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, Edit, Eye, Share2, Trash2, MoreVertical, 
  BookOpen, Users, TrendingUp, Calendar, Award, Clock, 
  BarChart3, Settings, Copy, ExternalLink, Star 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getUserQuizzes, deleteQuiz, shareQuiz } from '../api';

function Dashboard() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    if (user) {
      loadQuizzes();
    }
  }, [user]);

  const loadQuizzes = async (forceSample = false) => {
    let timeoutId = null;
    let progressInterval = null;
    
    try {
      setLoading(true);
      setLoadingProgress(0);
      setError('');
      
      if (forceSample) {
        console.log('Loading sample data as requested...');
        setError('Loaded sample quiz data for demonstration.');
        setQuizzes(getSampleQuizzes());
        setLoading(false);
        return;
      }
      
      // Progress tracking
      progressInterval = setInterval(() => {
        setLoadingProgress(prev => Math.min(prev + 10, 90));
      }, 200);
      
      // Set a timeout to show sample data if API takes too long
      timeoutId = setTimeout(() => {
        console.log('API taking too long, loading sample data...');
        clearInterval(progressInterval);
        setError('API connection slow. Showing sample data for demonstration.');
        setQuizzes(getSampleQuizzes());
        setLoading(false);
      }, 8000); // Increased to 8 second timeout to match server response time
      
      console.log('Attempting to fetch quizzes for user:', user?.id);
      const response = await getUserQuizzes(user.id);
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      setLoadingProgress(100);
      setQuizzes(response.data);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error loading quizzes:', error);
      
      // Clear the timeout and progress interval if we reach this catch block
      if (timeoutId) clearTimeout(timeoutId);
      if (progressInterval) clearInterval(progressInterval);
      
      // More specific error handling
      if (error.isTimeout) {
        setError('Connection timeout. The server is taking too long to respond.');
      } else if (error.response) {
        setError(`Server error: ${error.response.status}. Showing sample data for demonstration.`);
      } else if (error.request) {
        setError('Unable to connect to server. Please check your connection.');
      } else {
        setError('An unexpected error occurred. Showing sample data for demonstration.');
      }
      
      setQuizzes(getSampleQuizzes());
    } finally {
      setLoading(false);
    }
  };

  const getSampleQuizzes = () => [
    {
      _id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics including variables, functions, and objects.',
      category: 'Programming',
      questions: [1, 2, 3, 4, 5],
      attempts: 45,
      avgScore: 78,
      createdAt: new Date('2024-06-15'),
      difficulty: 'Medium',
      isPublic: true,
      tags: ['javascript', 'web-development']
    },
    {
      _id: '2',
      title: 'React Components',
      description: 'Understanding React components, props, and state management.',
      category: 'Web Development',
      questions: [1, 2, 3, 4, 5, 6, 7],
      attempts: 32,
      avgScore: 85,
      createdAt: new Date('2024-06-20'),
      difficulty: 'Advanced',
      isPublic: false,
      tags: ['react', 'components']
    },
    {
      _id: '3',
      title: 'Python Basics',
      description: 'Learn Python fundamentals including syntax, data types, and control structures.',
      category: 'Programming',
      questions: [1, 2, 3, 4, 5, 6],
      attempts: 28,
      avgScore: 72,
      createdAt: new Date('2024-06-25'),
      difficulty: 'Easy',
      isPublic: true,
      tags: ['python', 'basics']
    },
    {
      _id: '4',
      title: 'Database Design',
      description: 'Understanding relational databases, SQL, and database design principles.',
      category: 'Database',
      questions: [1, 2, 3, 4, 5, 6, 7, 8],
      attempts: 19,
      avgScore: 81,
      createdAt: new Date('2024-06-18'),
      difficulty: 'Hard',
      isPublic: false,
      tags: ['sql', 'database', 'design']
    },
    {
      _id: '5',
      title: 'CSS Grid & Flexbox',
      description: 'Master modern CSS layout techniques with Grid and Flexbox.',
      category: 'Web Development',
      questions: [1, 2, 3, 4, 5],
      attempts: 41,
      avgScore: 79,
      createdAt: new Date('2024-06-22'),
      difficulty: 'Medium',
      isPublic: true,
      tags: ['css', 'layout', 'flexbox', 'grid']
    }
  ];

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
      try {
        await deleteQuiz(quizId);
        setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
        showNotification('Quiz deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting quiz:', error);
        showNotification('Failed to delete quiz. Please try again.', 'error');
      }
    }
  };

  const handleShareQuiz = async (quizId) => {
    try {
      const response = await shareQuiz(quizId);
      const shareUrl = response.data?.shareUrl || `${window.location.origin}/quiz/${quizId}`;
      
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        showNotification('Share link copied to clipboard!', 'success');
      } else {
        prompt('Copy this share link:', shareUrl);
      }
    } catch (error) {
      console.error('Error sharing quiz:', error);
      showNotification('Failed to generate share link', 'error');
    }
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(''), 3000);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': 
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const sortedAndFilteredQuizzes = quizzes
    .filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           quiz.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           quiz.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = filterCategory === 'all' || quiz.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'attempts':
          return (b.attempts || 0) - (a.attempts || 0);
        case 'score':
          return (b.avgScore || 0) - (a.avgScore || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const categories = [...new Set(quizzes.map(quiz => quiz.category))];
  
  // Calculate dashboard stats
  const totalQuizzes = quizzes.length;
  const totalAttempts = quizzes.reduce((sum, quiz) => sum + (quiz.attempts || 0), 0);
  const averageScore = totalAttempts > 0 
    ? Math.round(quizzes.reduce((sum, quiz) => sum + (quiz.avgScore || 0), 0) / quizzes.length)
    : 0;
  const publicQuizzes = quizzes.filter(quiz => quiz.isPublic).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Dashboard</h2>
          <p className="text-gray-500 mb-4">Connecting to server...</p>
          <p className="text-gray-400 text-sm mb-6">Please wait while we load your quizzes. This usually takes a few seconds.</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-200" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          
          <button
            onClick={() => loadQuizzes(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Load Sample Data Instead
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
            notification.type === 'success' ? 'bg-green-500 text-white' :
            notification.type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
          }`}>
            {notification.message}
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                📚 Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your quizzes and track their performance
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/analytics"
                className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm border border-gray-200"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Link>
              <Link
                to="/create"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Quiz
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Quizzes</p>
                  <p className="text-3xl font-bold text-gray-900">{totalQuizzes}</p>
                </div>
                <div className="bg-blue-100 rounded-full p-3">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Attempts</p>
                  <p className="text-3xl font-bold text-gray-900">{totalAttempts}</p>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Average Score</p>
                  <p className="text-3xl font-bold text-gray-900">{averageScore}%</p>
                </div>
                <div className="bg-yellow-100 rounded-full p-3">
                  <TrendingUp className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Public Quizzes</p>
                  <p className="text-3xl font-bold text-gray-900">{publicQuizzes}</p>
                </div>
                <div className="bg-purple-100 rounded-full p-3">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 lg:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search quizzes, descriptions, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* Filters Row */}
              <div className="flex gap-3">
                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                >
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest First</option>
                  <option value="attempts">Most Attempted</option>
                  <option value="score">Highest Score</option>
                  <option value="title">Alphabetical</option>
                </select>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-amber-800 font-medium">{error}</p>
                  <p className="text-amber-700 text-sm mt-1">Showing sample data for demonstration purposes.</p>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => loadQuizzes()}
                  className="px-3 py-1 bg-amber-600 text-white text-sm rounded hover:bg-amber-700 transition-colors"
                >
                  Retry Connection
                </button>
                <button
                  onClick={() => loadQuizzes(true)}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                >
                  Load Sample Data
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Content */}
        {sortedAndFilteredQuizzes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-16 w-16 text-blue-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              {searchTerm || filterCategory !== 'all' ? 'No quizzes found' : 'Ready to create your first quiz?'}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your search criteria or explore different categories.' 
                : 'Get started by creating engaging quizzes that your audience will love. It only takes a few minutes!'
              }
            </p>
            {(!searchTerm && filterCategory === 'all') && (
              <div className="space-y-4">
                <Link
                  to="/create"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-lg font-medium shadow-lg"
                >
                  <Plus className="h-5 w-5 mr-3" />
                  Create Your First Quiz
                </Link>
                <div className="flex justify-center space-x-6 text-sm text-gray-500">
                  <span>✨ Easy to use</span>
                  <span>📊 Built-in analytics</span>
                  <span>🚀 Share anywhere</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {sortedAndFilteredQuizzes.length} of {totalQuizzes} quiz{totalQuizzes !== 1 ? 'es' : ''}
                {searchTerm && ` matching "${searchTerm}"`}
                {filterCategory !== 'all' && ` in ${filterCategory}`}
              </p>
            </div>

            {/* Quiz Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {sortedAndFilteredQuizzes.map((quiz) => (
                <div 
                  key={quiz._id} 
                  className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group ${
                    viewMode === 'list' ? 'flex items-center p-4' : ''
                  }`}
                >
                  {viewMode === 'grid' ? (
                    <div className="p-6">
                      {/* Quiz Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {quiz.title}
                            </h3>
                            {quiz.isPublic && (
                              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                <Star className="h-3 w-3 mr-1" />
                                Public
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                              {quiz.category}
                            </span>
                            {quiz.difficulty && (
                              <span className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                                {quiz.difficulty}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="relative">
                          <button 
                            onClick={() => setActiveDropdown(activeDropdown === quiz._id ? null : quiz._id)}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {activeDropdown === quiz._id && (
                            <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                              <Link
                                to={`/edit/${quiz._id}`}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Quiz
                              </Link>
                              <Link
                                to={`/quiz/${quiz._id}`}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Open Quiz
                              </Link>
                              <button
                                onClick={() => {
                                  handleShareQuiz(quiz._id);
                                  setActiveDropdown(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Share Link
                              </button>
                              <hr className="my-1" />
                              <button
                                onClick={() => {
                                  handleDeleteQuiz(quiz._id);
                                  setActiveDropdown(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Quiz
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quiz Description */}
                      {quiz.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {quiz.description}
                        </p>
                      )}

                      {/* Quiz Tags */}
                      {quiz.tags && quiz.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {quiz.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              #{tag}
                            </span>
                          ))}
                          {quiz.tags.length > 3 && (
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              +{quiz.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Quiz Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div className="flex items-center text-gray-600">
                          <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{quiz.questions?.length || 0} questions</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-green-500" />
                          <span>{quiz.attempts || 0} attempts</span>
                        </div>
                        {quiz.avgScore !== undefined && (
                          <div className="flex items-center text-gray-600">
                            <Award className="h-4 w-4 mr-2 text-yellow-500" />
                            <span className={getScoreColor(quiz.avgScore)}>
                              {quiz.avgScore}% avg score
                            </span>
                          </div>
                        )}
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-purple-500" />
                          <span>{new Date(quiz.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex gap-2">
                        <Link
                          to={`/edit/${quiz._id}`}
                          className="flex items-center justify-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-1"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                        <Link
                          to={`/quiz/${quiz._id}`}
                          className="flex items-center justify-center px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors flex-1"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Link>
                        <button
                          onClick={() => handleShareQuiz(quiz._id)}
                          className="flex items-center justify-center px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex-1"
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* List View */
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {quiz.title}
                            </h3>
                            {quiz.isPublic && (
                              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                <Star className="h-3 w-3 mr-1" />
                                Public
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <BookOpen className="h-4 w-4 mr-1" />
                              {quiz.questions?.length || 0} questions
                            </span>
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {quiz.attempts || 0} attempts
                            </span>
                            {quiz.avgScore !== undefined && (
                              <span className={`flex items-center ${getScoreColor(quiz.avgScore)}`}>
                                <Award className="h-4 w-4 mr-1" />
                                {quiz.avgScore}% avg
                              </span>
                            )}
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {quiz.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/edit/${quiz._id}`}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <Link
                          to={`/quiz/${quiz._id}`}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleShareQuiz(quiz._id)}
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuiz(quiz._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
