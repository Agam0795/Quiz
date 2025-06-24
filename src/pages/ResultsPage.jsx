import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultsPage.css';

const ResultsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate('/');
    return null;
  }

  const { results, score, total } = state;
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="results-page-container">
      <div className="results-summary">
        <h1>Test Results</h1>
        <h2>Your Score: {score} / {total} ({percentage}%)</h2>
        <p>{percentage >= 70 ? "Excellent work!" : percentage >= 50 ? "Good job!" : "Keep practicing!"}</p>
      </div>
      <div className="results-details">
        {results.map((result, index) => (
          <div key={index} className={`result-card ${result.isCorrect ? 'correct' : 'incorrect'}`}>
            <p className="question-text"><strong>Q{index + 1}:</strong> {result.question}</p>
            <p>Your Answer: {result.selectedAnswer || 'Not Answered'}</p>
            {!result.isCorrect && (
              <p>Correct Answer: {result.correctAnswer}</p>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/')} className="back-to-home-btn">
        Back to Home
      </button>
    </div>
  );
};

export default ResultsPage;