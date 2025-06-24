import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TestPage.css';

const TestPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load quiz data from localStorage or redirect if not found
    const loadQuiz = () => {
      try {
        const savedQuiz = localStorage.getItem('currentQuiz');
        if (!savedQuiz) {
          throw new Error('No quiz data found. Please select a test from the dashboard.');
        }
        
        const quizData = JSON.parse(savedQuiz);
        if (quizData.id !== quizId) {
          throw new Error('Invalid quiz session. Please try again.');
        }

        setQuiz(quizData);
        setQuestions(quizData.questions || []);
        setAnswers(new Array(quizData.questions?.length || 0).fill(null));
        setTimeLeft(quizData.timeLimit || 60 * 30); // Default to 30 minutes if not specified
      } catch (err) {
        setError(err.message || 'Failed to load test. Please try again.');
        console.error('Error loading quiz:', err);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizId]);

  const handleSubmit = useCallback(() => {
    if (!quiz) return;
    
    let score = 0;
    const results = questions.map((question, index) => {
      const isCorrect = question.correctAnswer === answers[index];
      if (isCorrect) {
        score++;
      }
      return {
        question: question.text || question.question,
        selectedAnswer: answers[index] !== null ? question.options[answers[index]] : 'Not answered',
        correctAnswer: question.options[question.correctAnswer],
        isCorrect,
      };
    });

    // Save results to localStorage for the results page
    const testResult = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      date: new Date().toISOString(),
      score,
      totalQuestions: questions.length,
      results
    };

    // Save to test history
    const testHistory = JSON.parse(localStorage.getItem('testHistory') || '[]');
    testHistory.push(testResult);
    localStorage.setItem('testHistory', JSON.stringify(testHistory));

    // Clean up
    localStorage.removeItem('currentQuiz');

    // Navigate to results page
    navigate('/results', { state: testResult });
  }, [questions, answers, navigate, quiz]);

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  useEffect(() => {
    // Timer logic
    if (timeLeft === 0) {
      handleSubmit();
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit]);


  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading test questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/dashboard')} className="back-button">
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="error-container">
        <h2>No Questions Available</h2>
        <p>This test doesn't have any questions yet.</p>
        <button onClick={() => navigate('/dashboard')} className="back-button">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="test-page-container">
      <div className="test-header">
        <div className="quiz-info">
          <h1>{quiz?.title || 'Test'}</h1>
          <div className="question-counter">
            Question {currentIndex + 1} of {questions.length}
          </div>
        </div>
        <div className="timer">
          ⏱️ {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${progress}%` }}
          aria-valuenow={progress} 
          aria-valuemin="0" 
          aria-valuemax="100"
        ></div>
      </div>

      <div className="question-card">
        <p className="question-text">{currentQuestion.text || currentQuestion.question}</p>
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${answers[currentIndex] === index ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(index)}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}.</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        <button 
          className={`nav-btn prev-btn ${currentIndex === 0 ? 'disabled' : ''}`}
          onClick={() => setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>
        
        <div className="question-indicators">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`indicator ${currentIndex === index ? 'active' : ''} ${answers[index] !== undefined ? 'answered' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to question ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        
        {currentIndex < questions.length - 1 ? (
          <button 
            className="nav-btn next-btn"
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            Next →
          </button>
        ) : (
          <button 
            className="submit-btn"
            onClick={handleSubmit}
          >
            Submit Test
          </button>
        )}
      </div>

      <div className="test-footer">
        <button 
          className="flag-btn"
          onClick={() => {
            // Toggle flag for current question
            const flaggedQuestions = JSON.parse(localStorage.getItem('flaggedQuestions') || '{}');
            flaggedQuestions[quizId] = flaggedQuestions[quizId] || [];
            const questionIndex = flaggedQuestions[quizId].indexOf(currentIndex);
            
            if (questionIndex === -1) {
              flaggedQuestions[quizId].push(currentIndex);
            } else {
              flaggedQuestions[quizId].splice(questionIndex, 1);
            }
            
            localStorage.setItem('flaggedQuestions', JSON.stringify(flaggedQuestions));
          }}
        >
          🚩 {JSON.parse(localStorage.getItem('flaggedQuestions') || '{}')[quizId]?.includes(currentIndex) ? 'Unflag' : 'Flag'} Question
        </button>
      </div>
    </div>
  )
};

export default TestPage;