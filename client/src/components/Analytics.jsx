import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Trophy, Clock, Download, Calendar, BarChart3, PieChart as PieChartIcon, Activity, Target } from 'lucide-react';
import { getAnalytics } from '../api';
import { useAuth } from '../contexts/AuthContext';

function Analytics() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadAnalytics();
    }
  }, [user, dateRange]);

  const loadAnalytics = async (forceSample = false) => {
    try {
      setLoading(true);
      setError('');
      
      if (forceSample) {
        console.log('Loading sample analytics data as requested...');
        setError('Loaded sample analytics data for demonstration.');
        setAnalytics(getSampleData());
        setLoading(false);
        return;
      }
      
      // Set a timeout to show sample data if API takes too long
      const timeoutId = setTimeout(() => {
        console.log('Analytics API taking too long, loading sample data...');
        setError('API connection slow. Showing sample analytics data for demonstration.');
        setAnalytics(getSampleData());
        setLoading(false);
      }, 5000); // Increased to 5 second timeout for analytics
      
      const response = await getAnalytics({ days: parseInt(dateRange) });
      clearTimeout(timeoutId);
      setAnalytics(response.data);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error loading analytics:', error);
      setError('Unable to connect to analytics server. Showing sample data for demonstration.');
      setAnalytics(getSampleData());
    } finally {
      setLoading(false);
    }
  };

  const getSampleData = () => ({
    overview: {
      totalQuizzes: 5,
      totalAttempts: 23,
      averageScore: 75,
      totalUsers: 8
    },
    scoreDistribution: [
      { range: '0-20%', count: 1, percentage: 4.3 },
      { range: '21-40%', count: 2, percentage: 8.7 },
      { range: '41-60%', count: 5, percentage: 21.7 },
      { range: '61-80%', count: 8, percentage: 34.8 },
      { range: '81-100%', count: 7, percentage: 30.4 }
    ],
    quizPerformance: [
      { name: 'JavaScript Basics', attempts: 8, avgScore: 78, difficulty: 'Easy' },
      { name: 'React Fundamentals', attempts: 6, avgScore: 72, difficulty: 'Medium' },
      { name: 'Node.js Quiz', attempts: 5, avgScore: 85, difficulty: 'Medium' },
      { name: 'Database Design', attempts: 4, avgScore: 68, difficulty: 'Hard' }
    ],
    dailyActivity: generateDailyActivity(),
    categoryBreakdown: [
      { name: 'Programming', value: 3, color: '#3b82f6' },
      { name: 'Web Development', value: 2, color: '#10b981' }
    ]
  });

  const generateDailyActivity = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toISOString().split('T')[0],
        quizzes: Math.floor(Math.random() * 5),
        users: Math.floor(Math.random() * 10)
      });
    }
    return days;
  };

  const exportData = (format) => {
    alert(`Exporting analytics data as ${format}... (Feature coming soon!)`);
  };

  const data = analytics || getSampleData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Analytics</h2>
            <p className="text-gray-500 mb-4">Fetching your quiz performance data...</p>
            <p className="text-gray-400 text-sm mb-6">Taking longer than expected? Try sample data below.</p>
            <button
              onClick={() => loadAnalytics(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Load Sample Data Instead
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                📊 Analytics Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Comprehensive insights into your quiz performance and engagement
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 3 months</option>
                  <option value="365">Last year</option>
                </select>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => exportData('pdf')}
                  className="flex items-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </button>
                <button
                  onClick={() => exportData('csv')}
                  className="flex items-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  CSV
                </button>
              </div>
            </div>
          </div>

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
                    <p className="text-amber-700 text-sm mt-1">Showing sample analytics for demonstration purposes.</p>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => loadAnalytics()}
                    className="px-3 py-1 bg-amber-600 text-white text-sm rounded hover:bg-amber-700 transition-colors"
                  >
                    Retry Connection
                  </button>
                  <button
                    onClick={() => loadAnalytics(true)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    Load Sample Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Quizzes</p>
                <p className="text-3xl font-bold text-gray-900">{data.overview.totalQuizzes}</p>
                <p className="text-sm text-green-600 mt-1">
                  📝 Created by you
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Attempts</p>
                <p className="text-3xl font-bold text-gray-900">{data.overview.totalAttempts}</p>
                <p className="text-sm text-blue-600 mt-1">
                  🎯 Quiz submissions
                </p>
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
                <p className="text-3xl font-bold text-gray-900">{data.overview.averageScore}%</p>
                <p className="text-sm text-purple-600 mt-1">
                  📊 Performance metric
                </p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <TrendingUp className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">{data.overview.totalUsers}</p>
                <p className="text-sm text-indigo-600 mt-1">
                  👥 Unique participants
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Score Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Score Distribution
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="range" 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f9fafb', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                  name="Number of Scores"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <PieChartIcon className="h-5 w-5 mr-2 text-green-600" />
                Quiz Categories
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  labelLine={false}
                >
                  {data.categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f9fafb', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Activity Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-purple-600" />
              Daily Activity (Last 7 Days)
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#f9fafb', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="quizzes" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                name="Quiz Attempts"
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Active Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quiz Performance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Target className="h-5 w-5 mr-2 text-orange-600" />
              Quiz Performance Overview
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quiz Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attempts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.quizPerformance.map((quiz, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{quiz.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-semibold">{quiz.attempts}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 mr-2">{quiz.avgScore}%</div>
                        <div className={`w-16 h-2 rounded-full ${
                          quiz.avgScore >= 80 ? 'bg-green-200' : 
                          quiz.avgScore >= 60 ? 'bg-yellow-200' : 'bg-red-200'
                        }`}>
                          <div 
                            className={`h-2 rounded-full ${
                              quiz.avgScore >= 80 ? 'bg-green-500' : 
                              quiz.avgScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${quiz.avgScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {quiz.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        quiz.avgScore >= 75 ? 'bg-green-100 text-green-800' :
                        quiz.avgScore >= 50 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {quiz.avgScore >= 75 ? '🏆 Excellent' :
                         quiz.avgScore >= 50 ? '👍 Good' : '📈 Needs Improvement'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
