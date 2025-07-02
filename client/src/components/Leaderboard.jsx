import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star, Clock, User } from 'lucide-react';
import { getLeaderboard } from '../api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [timeframe, setTimeframe] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    loadLeaderboard();
  }, [filter, timeframe]);

  const loadLeaderboard = async (forceSample = false) => {
    try {
      setLoading(true);
      setError('');
      
      if (forceSample) {
        console.log('Loading sample leaderboard data as requested...');
        setError('Loaded sample leaderboard data for demonstration.');
        setLeaderboard(getSampleLeaderboard());
        setLoading(false);
        return;
      }
      
      // Set a timeout to show sample data if API takes too long
      const timeoutId = setTimeout(() => {
        console.log('Leaderboard API taking too long, loading sample data...');
        setError('API connection slow. Showing sample leaderboard data for demonstration.');
        setLeaderboard(getSampleLeaderboard());
        setLoading(false);
      }, 5000); // Increased to 5 second timeout for consistency
      
      const response = await getLeaderboard({ filter, timeframe });
      clearTimeout(timeoutId);
      
      if (Array.isArray(response.data)) {
        setLeaderboard(response.data);
      } else {
        // Handle old response format if it hasn't been updated yet
        setLeaderboard(response.data.leaderboard || []);
      }
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      setError('Unable to connect to server. Showing sample leaderboard data for demonstration.');
      setLeaderboard(getSampleLeaderboard());
    } finally {
      setLoading(false);
    }
  };

  const getSampleLeaderboard = () => [
    {
      _id: '1',
      userId: {
        name: 'Alice Johnson',
        avatar: null
      },
      totalScore: 285,
      averageScore: 95,
      quizzesCompleted: 3,
      lastActivity: new Date('2024-06-29')
    },
    {
      _id: '2', 
      userId: {
        name: 'Bob Smith',
        avatar: null
      },
      totalScore: 264,
      averageScore: 88,
      quizzesCompleted: 3,
      lastActivity: new Date('2024-06-28')
    },
    {
      _id: '3',
      userId: {
        name: 'Charlie Brown',
        avatar: null
      },
      totalScore: 245,
      averageScore: 82,
      quizzesCompleted: 3,
      lastActivity: new Date('2024-06-27')
    },
    {
      _id: '4',
      userId: {
        name: 'Diana Prince',
        avatar: null
      },
      totalScore: 228,
      averageScore: 76,
      quizzesCompleted: 3,
      lastActivity: new Date('2024-06-26')
    },
    {
      _id: '5',
      userId: {
        name: 'Ethan Hunt',
        avatar: null
      },
      totalScore: 210,
      averageScore: 70,
      quizzesCompleted: 3,
      lastActivity: new Date('2024-06-25')
    }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBackground = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default:
        return 'bg-white';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Leaderboard</h2>
          <p className="text-gray-500 mb-4">Fetching leaderboard data...</p>
          <p className="text-gray-400 text-sm mb-6">Taking longer than expected? Try sample data below.</p>
          <button
            onClick={() => loadLeaderboard(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Load Sample Data Instead
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-gray-600">See how you rank against other quiz masters</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="general-knowledge">General Knowledge</option>
                  <option value="science">Science</option>
                  <option value="history">History</option>
                  <option value="geography">Geography</option>
                  <option value="sports">Sports</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="technology">Technology</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timeframe
                </label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Time</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
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
                  <p className="text-amber-700 text-sm mt-1">Showing sample leaderboard for demonstration purposes.</p>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => loadLeaderboard()}
                  className="px-3 py-1 bg-amber-600 text-white text-sm rounded hover:bg-amber-700 transition-colors"
                >
                  Retry Connection
                </button>
                <button
                  onClick={() => loadLeaderboard(true)}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                >
                  Load Sample Data
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Top 3 */}
        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* 2nd Place */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center order-2 md:order-1">
              <div className={`${getRankBackground(2)} rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center text-white`}>
                {getRankIcon(2)}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {leaderboard[1]?.user?.name || leaderboard[1]?.user?.email || 'Anonymous'}
              </h3>
              <p className="text-sm text-gray-600 mb-2">2nd Place</p>
              <div className="text-lg font-bold text-gray-900">{leaderboard[1]?.totalScore || 0} pts</div>
              <div className="text-sm text-gray-600">{leaderboard[1]?.quizzesTaken || 0} quizzes</div>
            </div>

            {/* 1st Place */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center transform scale-105 order-1 md:order-2">
              <div className={`${getRankBackground(1)} rounded-full p-4 w-24 h-24 mx-auto mb-4 flex items-center justify-center text-white`}>
                {getRankIcon(1)}
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-lg">
                {leaderboard[0]?.user?.name || leaderboard[0]?.user?.email || 'Anonymous'}
              </h3>
              <p className="text-sm text-yellow-600 mb-2 font-semibold">🏆 Champion</p>
              <div className="text-xl font-bold text-gray-900">{leaderboard[0]?.totalScore || 0} pts</div>
              <div className="text-sm text-gray-600">{leaderboard[0]?.quizzesTaken || 0} quizzes</div>
            </div>

            {/* 3rd Place */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center order-3">
              <div className={`${getRankBackground(3)} rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center text-white`}>
                {getRankIcon(3)}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {leaderboard[2]?.user?.name || leaderboard[2]?.user?.email || 'Anonymous'}
              </h3>
              <p className="text-sm text-gray-600 mb-2">3rd Place</p>
              <div className="text-lg font-bold text-gray-900">{leaderboard[2]?.totalScore || 0} pts</div>
              <div className="text-sm text-gray-600">{leaderboard[2]?.quizzesTaken || 0} quizzes</div>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Full Rankings</h2>
          </div>

          {leaderboard.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No scores available yet.</p>
              <p className="text-sm">Be the first to take a quiz!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {leaderboard.map((entry, index) => {
                const rank = index + 1;
                const isTopThree = rank <= 3;
                
                return (
                  <div 
                    key={entry.user?._id || index} 
                    className={`px-6 py-4 flex items-center justify-between hover:bg-gray-50 ${
                      isTopThree ? 'bg-yellow-50' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        {isTopThree ? (
                          <div className={`${getRankBackground(rank)} rounded-full p-2 w-10 h-10 flex items-center justify-center`}>
                            {rank <= 3 ? (
                              <div className="text-white text-sm font-bold">#{rank}</div>
                            ) : (
                              getRankIcon(rank)
                            )}
                          </div>
                        ) : (
                          <div className="text-lg font-bold text-gray-600">#{rank}</div>
                        )}
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 rounded-full p-2">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {entry.user?.name || entry.user?.email || 'Anonymous'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {entry.quizzesTaken || 0} quizzes completed
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="text-lg font-bold text-gray-900">
                            {entry.totalScore || 0}
                          </div>
                          <div className="text-sm text-gray-600">total points</div>
                        </div>

                        <div>
                          <div className="text-lg font-semibold text-blue-600">
                            {entry.averageScore ? `${Math.round(entry.averageScore)}%` : '0%'}
                          </div>
                          <div className="text-sm text-gray-600">avg score</div>
                        </div>

                        {isTopThree && (
                          <div className="ml-2">
                            <Star className="h-5 w-5 text-yellow-500 fill-current" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Stats Summary */}
        {leaderboard.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {leaderboard.length}
              </div>
              <div className="text-sm text-gray-600">Active Players</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {leaderboard.reduce((sum, entry) => sum + (entry.quizzesTaken || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Quizzes Taken</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {Math.round(leaderboard.reduce((sum, entry) => sum + (entry.averageScore || 0), 0) / leaderboard.length) || 0}%
              </div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
