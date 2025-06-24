import React from 'react';

const ResultCard = ({ result }) => {
  const {
    totalQuestions,
    correctAnswers,
    totalPoints,
    pointsScored,
    timeTaken,
    answers
  } = result;

  const percentage = Math.round((pointsScored / totalPoints) * 100);

  return (
    <div className="result-card">
      <div className="result-header">
        <h2>Test Results</h2>
        <div className="score-circle">
          <span className="percentage">{percentage}%</span>
        </div>
      </div>

      <div className="result-stats">
        <div className="stat-item">
          <label>Total Questions:</label>
          <span>{totalQuestions}</span>
        </div>
        <div className="stat-item">
          <label>Correct Answers:</label>
          <span>{correctAnswers}</span>
        </div>
        <div className="stat-item">
          <label>Points Scored:</label>
          <span>{pointsScored} / {totalPoints}</span>
        </div>
        <div className="stat-item">
          <label>Time Taken:</label>
          <span>{Math.floor(timeTaken / 60)}m {timeTaken % 60}s</span>
        </div>
      </div>

      <div className="answers-review">
        <h3>Question Review</h3>
        {answers.map((answer, index) => (
          <div key={index} className={`answer-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
            <p className="question-title">{answer.question}</p>
            <p className="selected-answer">
              Your answer: <span>{answer.selectedAnswer}</span>
            </p>
            {!answer.isCorrect && (
              <p className="correct-answer">
                Correct answer: <span>{answer.correctAnswer}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultCard; 