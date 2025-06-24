import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuizzes } from '../../services/quizService';
import './AvailableTests.css';

// Mock quiz data with realistic questions and answers
const MOCK_QUIZZES = [
  {
    _id: 'react-fundamentals',
    title: 'React Fundamentals',
    description: 'Test your knowledge of React basics including components, props, and state management.',
    duration: 15,
    questions: [
      {
        id: 'q1',
        text: 'What is the correct command to create a new React project?',
        options: [
          'npm create-react-app',
          'npx create-react-app',
          'npm init react-app',
          'All of the above'
        ],
        correctAnswer: 3
      },
      {
        id: 'q2',
        text: 'What does JSX stand for?',
        options: [
          'JavaScript XML',
          'JavaScript Extension',
          'JavaScript Syntax',
          'JavaScript XML Syntax'
        ],
        correctAnswer: 0
      },
      {
        id: 'q3',
        text: 'Which method is used to change the state in a React component?',
        options: [
          'this.setState()',
          'this.state()',
          'this.changeState()',
          'this.updateState()'
        ],
        correctAnswer: 0
      }
    ],
    isActive: true
  },
  {
    _id: 'javascript-advanced',
    title: 'JavaScript Advanced Concepts',
    description: 'Test your knowledge of closures, prototypes, async/await, and other advanced JavaScript topics.',
    duration: 20,
    questions: [
      {
        id: 'q1',
        text: 'What is a closure in JavaScript?',
        options: [
          'A function with access to its own scope',
          'A function with access to its parent scope',
          'A function that returns another function',
          'A function that takes another function as an argument'
        ],
        correctAnswer: 1
      },
      {
        id: 'q2',
        text: 'What is the output of: console.log(1 + "2" + "2");',
        options: [
          '122',
          '5',
          '32',
          '14'
        ],
        correctAnswer: 0
      }
    ],
    isActive: true
  },
  {
    _id: 'css-mastery',
    title: 'CSS Grid and Flexbox',
    description: 'Test your layout skills with modern CSS Grid and Flexbox techniques.',
    duration: 10,
    questions: [
      {
        id: 'q1',
        text: 'Which property is used to align items along the cross axis in Flexbox?',
        options: [
          'align-items',
          'justify-content',
          'align-content',
          'justify-items'
        ],
        correctAnswer: 0
      },
      {
        id: 'q2',
        text: 'Which property defines the size of the gap between grid items?',
        options: [
          'grid-gap',
          'gap',
          'grid-spacing',
          'Both A and B'
        ],
        correctAnswer: 3
      }
    ],
    isActive: true
  }
];

const AvailableTests = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        // Try to fetch from API first
        const data = await getQuizzes();
        const activeQuizzes = Array.isArray(data) ? data.filter(quiz => quiz.isActive) : [];
        
        if (activeQuizzes.length > 0) {
          setQuizzes(activeQuizzes);
        } else {
          // Use mock data if no active quizzes from API
          setQuizzes(MOCK_QUIZZES);
          setError('Using sample test data. API returned no active quizzes.');
        }
      } catch (err) {
        // If API fails, use mock data as a fallback
        console.error('Error fetching quizzes:', err);
        setError('Could not connect to the server. Showing sample test data.');
        setQuizzes(MOCK_QUIZZES);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleStartTest = (quizId) => {
    // Store the selected quiz in localStorage before navigating
    const quiz = quizzes.find(q => q._id === quizId);
    if (quiz) {
      localStorage.setItem('currentQuiz', JSON.stringify({
        id: quiz._id,
        title: quiz.title,
        questions: quiz.questions,
        timeLimit: quiz.duration * 60 // Convert minutes to seconds
      }));
      navigate(`/test/${quizId}`);
    } else {
      setError('Failed to start test. Please try again.');
    }
  };

  if (loading) return <div className="loading-container">Loading available tests...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="available-tests-container">
      <h2 className="header">Available Tests</h2>
      {error && <div className="alert alert-warning">{error}</div>}
      {quizzes.length === 0 ? (
        <div className="no-tests-message">
          <p>No tests are available at the moment. Please check back later.</p>
        </div>
      ) : (
        <div className="tests-grid">
          {quizzes.map((quiz, idx) => (
            <div key={quiz._id} className="test-card enhanced">
              <div className="card-header">
                <span className="test-icon" role="img" aria-label="quiz">
                  {quiz.title.includes('React') ? '⚛️' : 
                   quiz.title.includes('JavaScript') ? '📜' : '🎨'}
                </span>
                <div>
                  <h3 className="quiz-title">
                    {quiz.title}
                    {idx === 0 && <span className="badge new">NEW</span>}
                    {idx === 1 && <span className="badge recommended">★ Recommended</span>}
                  </h3>
                  <div className="meta-info">
                    <span className="duration">⏱️ {quiz.duration} min</span>
                    <span className="question-count">❓ {quiz.questions?.length || 0} Questions</span>
                  </div>
                </div>
              </div>
              <p className="quiz-description">{quiz.description}</p>
              <div className="card-footer">
                <div className="difficulty">
                  <span className={`diff-${['easy', 'medium', 'hard'][idx % 3]}`}>
                    {['Easy', 'Medium', 'Hard'][idx % 3]}
                  </span>
                </div>
                <button 
                  onClick={() => handleStartTest(quiz._id)}
                  className="start-button enhanced"
                  disabled={!quiz.questions || quiz.questions.length === 0}
                >
                  <span role="img" aria-hidden="true">▶️</span> Start Test
                  {quiz.questions && quiz.questions.length > 0 && (
                    <span className="tooltip">Click to begin the test</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableTests;
