import React, { useState, useEffect } from 'react';
import { getUserTests } from '../../services/testService';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './MyResults.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock results data
const MOCK_RESULTS = [
  {
    _id: 'res1',
    quiz: { 
      _id: 'react-fundamentals',
      title: 'React Fundamentals',
      passingScore: 70 
    }, 
    score: 85, 
    completedAt: new Date().toISOString(), 
    correctAnswers: 17, 
    totalQuestions: 20,
    timeSpent: 720, // seconds
    answers: [
      { questionId: 'q1', isCorrect: true, selectedOption: 2, correctOption: 2 },
      { questionId: 'q2', isCorrect: true, selectedOption: 0, correctOption: 0 },
      { questionId: 'q3', isCorrect: false, selectedOption: 2, correctOption: 0 },
    ]
  },
  {
    _id: 'res2',
    quiz: { 
      _id: 'javascript-advanced',
      title: 'JavaScript Advanced',
      passingScore: 60 
    },
    score: 45, 
    completedAt: new Date(Date.now() - 86400000 * 2).toISOString(), 
    correctAnswers: 9, 
    totalQuestions: 20,
    timeSpent: 950,
    answers: [
      { questionId: 'q1', isCorrect: true, selectedOption: 1, correctOption: 1 },
      { questionId: 'q2', isCorrect: false, selectedOption: 1, correctOption: 0 },
    ]
  },
  {
    _id: 'res3',
    quiz: { 
      _id: 'css-mastery',
      title: 'CSS Grid and Flexbox',
      passingScore: 70 
    },
    score: 92, 
    completedAt: new Date(Date.now() - 86400000 * 5).toISOString(), 
    correctAnswers: 23, 
    totalQuestions: 25,
    timeSpent: 1050,
    answers: [
      { questionId: 'q1', isCorrect: true, selectedOption: 0, correctOption: 0 },
      { questionId: 'q2', isCorrect: true, selectedOption: 2, correctOption: 2 },
    ]
  }
];

const MyResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Prepare chart data
  const chartData = {
    labels: results.map(result => result.quiz.title),
    datasets: [
      {
        label: 'Your Score %',
        data: results.map(result => result.score),
        backgroundColor: results.map(result => 
          result.score >= (result.quiz.passingScore || 70) ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)'
        ),
        borderColor: results.map(result => 
          result.score >= (result.quiz.passingScore || 70) ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'
        ),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score %'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const result = results[context.dataIndex];
            return `${result.correctAnswers} of ${result.totalQuestions} correct`;
          }
        }
      }
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // Try to fetch from API first
        const data = await getUserTests();
        const userResults = data?.tests || [];

        if (userResults.length > 0) {
          setResults(userResults);
        } else {
          // Use mock data if no results from API
          setResults(MOCK_RESULTS);
          setError('Using sample results data. No test history found.');
        }
      } catch (err) {
        // If API fails, use mock data as a fallback
        console.error('Error fetching results:', err);
        setError('Could not connect to the server. Showing sample results.');
        setResults(MOCK_RESULTS);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <div className="loading-container">Loading your results...</div>;

  return (
    <div className="my-results-container">
      <h2 className="header">My Test Results</h2>
      
      {error && <div className="alert alert-warning">{error}</div>}
      
      {results.length === 0 ? (
        <div className="no-results-message">
          <div className="empty-state">
            <div className="empty-icon">📊</div>
          <h3>No Test Results Yet</h3>
          <p>You haven't completed any tests. Your results will appear here after you take a test.</p>
        </div>
      </div>
      ) : (
        <>
          <div className="results-summary">
            <div className="summary-card">
              <h3>Overall Performance</h3>
              <div className="summary-stats">
                <div className="stat">
                  <span className="stat-value">
                    {Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)}%
                  </span>
                  <span className="stat-label">Average Score</span>
                </div>
                <div className="stat">
                  <span className="stat-value">
                    {results.filter(r => r.score >= 70).length}
                  </span>
                  <span className="stat-label">Tests Passed</span>
                </div>
                <div className="stat">
                  <span className="stat-value">
                    {results.length}
                  </span>
                  <span className="stat-label">Total Tests</span>
                </div>
              </div>
            </div>
          </div>

          <div className="results-chart">
            <h3>Performance Overview</h3>
            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="results-list">
            <h3>Test History</h3>
            {results.map((result) => {
              const passed = result.score >= (result.quiz.passingScore || 70);
              const date = new Date(result.completedAt);
              const timeSpent = result.timeSpent ? 
                `${Math.floor(result.timeSpent / 60)}m ${result.timeSpent % 60}s` : 'N/A';
              
              return (
                <div key={result._id} className={`result-card ${passed ? 'passed' : 'failed'}`}>
                  <div className="result-header">
                    <div className="quiz-info">
                      <h3 className="quiz-title">{result.quiz.title}</h3>
                      <span className="test-date">
                        {date.toLocaleDateString()} • {date.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="score-container">
                      <span className={`score ${passed ? 'pass' : 'fail'}`}>
                        {result.score}%
                      </span>
                      <span className="badge">
                        {passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="result-details">
                    <div className="detail">
                      <span className="detail-label">Correct Answers:</span>
                      <span className="detail-value">
                        {result.correctAnswers} / {result.totalQuestions}
                      </span>
                    </div>
                    <div className="detail">
                      <span className="detail-label">Time Spent:</span>
                      <span className="detail-value">{timeSpent}</span>
                    </div>
                    <div className="detail">
                      <span className="detail-label">Passing Score:</span>
                      <span className="detail-value">{result.quiz.passingScore || 70}%</span>
                    </div>
                  </div>
                  
                  {result.answers && (
                    <div className="answers-breakdown">
                      <h4>Question Breakdown:</h4>
                      <div className="answers-grid">
                        {result.answers.map((answer, idx) => (
                          <span 
                            key={idx} 
                            className={`answer-dot ${answer.isCorrect ? 'correct' : 'incorrect'}`}
                            title={`Question ${idx + 1}: ${answer.isCorrect ? 'Correct' : 'Incorrect'}`}
                          >
                            {answer.isCorrect ? '✓' : '✗'}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default MyResults;
