import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import { getQuiz, submitScore } from '../api';
import { useAuth } from '../contexts/AuthContext';

function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadQuiz();
  }, [id]);

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !quizCompleted) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, quizCompleted]);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      const response = await getQuiz(id);
      const quizData = response.data;
      setQuiz(quizData);
      
      if (quizData.timeLimit > 0) {
        setTimeLeft(quizData.timeLimit * 60); // Convert to seconds
      }
    } catch (error) {
      console.error('Error loading quiz:', error);
      setError('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;
    const results = [];

    quiz.questions.forEach((question, index) => {
      maxScore += question.points || 1;
      const userAnswer = answers[index];
      let isCorrect = false;

      if (question.type === 'multiple-choice') {
        isCorrect = userAnswer === question.correctAnswer;
      } else if (question.type === 'true-false') {
        isCorrect = userAnswer === question.correctAnswer;
      } else if (question.type === 'short-answer') {
        isCorrect = userAnswer?.toLowerCase().trim() === question.correctAnswer?.toLowerCase().trim();
      } else if (question.type === 'fill-in-blank') {
        isCorrect = userAnswer?.toLowerCase().trim() === question.correctAnswer?.toLowerCase().trim();
      } else if (question.type === 'drag-drop') {
        isCorrect = userAnswer === question.correctAnswer;
      }

      if (isCorrect) {
        totalScore += question.points || 1;
      }

      results.push({
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        points: question.points || 1,
        explanation: question.explanation
      });
    });

    return {
      score: totalScore,
      maxScore,
      percentage: Math.round((totalScore / maxScore) * 100),
      results
    };
  };

  const handleSubmitQuiz = async () => {
    if (submitting) return;

    setSubmitting(true);
    const scoreData = calculateScore();

    try {
      await submitScore({
        quizId: id,
        score: scoreData.score,
        maxScore: scoreData.maxScore,
        percentage: scoreData.percentage,
        answers: answers,
        timeSpent: quiz.timeLimit ? (quiz.timeLimit * 60 - timeLeft) : null
      });

      setScore(scoreData);
      setQuizCompleted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError('Failed to submit quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const retakeQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setQuizStarted(false);
    setQuizCompleted(false);
    setScore(null);
    if (quiz.timeLimit > 0) {
      setTimeLeft(quiz.timeLimit * 60);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Quiz Not Found</h2>
          <p className="text-gray-600 mb-4">The quiz you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Quiz completion screen
  if (quizCompleted && score) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center mb-8">
              <div className="mb-4">
                {score.percentage >= 80 ? (
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                ) : score.percentage >= 60 ? (
                  <CheckCircle className="h-16 w-16 text-yellow-500 mx-auto" />
                ) : (
                  <XCircle className="h-16 w-16 text-red-500 mx-auto" />
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h1>
              <p className="text-xl text-gray-600 mb-4">
                You scored {score.score} out of {score.maxScore} points
              </p>
              <div className="text-4xl font-bold text-blue-600 mb-6">
                {score.percentage}%
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Review Answers</h2>
              {score.results.map((result, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-gray-900">
                      Question {index + 1}: {result.question}
                    </h3>
                    <div className="flex items-center">
                      {result.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Your answer: </span>
                      <span className={result.isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {quiz.questions[index].type === 'multiple-choice' 
                          ? quiz.questions[index].options[result.userAnswer] || 'Not answered'
                          : quiz.questions[index].type === 'true-false'
                          ? (result.userAnswer === 0 ? 'True' : result.userAnswer === 1 ? 'False' : 'Not answered')
                          : result.userAnswer || 'Not answered'
                        }
                      </span>
                    </div>
                    
                    {!result.isCorrect && (
                      <div>
                        <span className="font-medium text-gray-700">Correct answer: </span>
                        <span className="text-green-600">
                          {quiz.questions[index].type === 'multiple-choice' 
                            ? quiz.questions[index].options[result.correctAnswer]
                            : quiz.questions[index].type === 'true-false'
                            ? (result.correctAnswer === 0 ? 'True' : 'False')
                            : result.correctAnswer
                          }
                        </span>
                      </div>
                    )}
                    
                    {result.explanation && (
                      <div className="bg-blue-50 p-3 rounded-md mt-2">
                        <span className="font-medium text-blue-800">Explanation: </span>
                        <span className="text-blue-700">{result.explanation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={retakeQuiz}
                className="flex items-center px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz start screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{quiz.title}</h1>
            
            {quiz.description && (
              <p className="text-gray-600 mb-6">{quiz.description}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Quiz Details</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>Questions: {quiz.questions.length}</li>
                  <li>Category: {quiz.category || 'General'}</li>
                  {quiz.timeLimit > 0 && (
                    <li>Time Limit: {quiz.timeLimit} minutes</li>
                  )}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Instructions</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Answer all questions</li>
                  <li>• You can navigate between questions</li>
                  <li>• Submit when you're ready</li>
                  {quiz.timeLimit > 0 && (
                    <li>• Quiz will auto-submit when time runs out</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={startQuiz}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg font-medium"
              >
                Start Quiz
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz taking screen
  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{quiz.title}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </p>
            </div>
            
            {timeLeft !== null && (
              <div className="flex items-center text-lg font-medium text-gray-900">
                <Clock className="h-5 w-5 mr-2" />
                <span className={timeLeft < 300 ? 'text-red-600' : ''}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            {question.question}
          </h2>

          {/* Multiple Choice */}
          {question.type === 'multiple-choice' && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label key={index} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={index}
                    checked={answers[currentQuestion] === index}
                    onChange={() => handleAnswerChange(currentQuestion, index)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mr-3"
                  />
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          )}

          {/* True/False */}
          {question.type === 'true-false' && (
            <div className="space-y-3">
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={0}
                  checked={answers[currentQuestion] === 0}
                  onChange={() => handleAnswerChange(currentQuestion, 0)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mr-3"
                />
                <span className="text-gray-900">True</span>
              </label>
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={1}
                  checked={answers[currentQuestion] === 1}
                  onChange={() => handleAnswerChange(currentQuestion, 1)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mr-3"
                />
                <span className="text-gray-900">False</span>
              </label>
            </div>
          )}

          {/* Short Answer */}
          {question.type === 'short-answer' && (
            <div>
              <input
                type="text"
                value={answers[currentQuestion] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your answer"
              />
            </div>
          )}

          {/* Fill in the Blank */}
          {question.type === 'fill-in-blank' && (
            <div>
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  {question.question.replace('[blank]', '_____')}
                </p>
              </div>
              <input
                type="text"
                value={answers[currentQuestion] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the word/phrase that fills the blank"
              />
            </div>
          )}

          {/* Drag and Drop */}
          {question.type === 'drag-drop' && (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Drag the items into the correct order, or click to select the order:
              </p>
              <div className="space-y-2">
                {question.options.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      const currentOrder = answers[currentQuestion] || [];
                      const newOrder = [...currentOrder];
                      const itemIndex = newOrder.indexOf(index + 1);
                      
                      if (itemIndex === -1) {
                        newOrder.push(index + 1);
                      } else {
                        newOrder.splice(itemIndex, 1);
                      }
                      
                      handleAnswerChange(currentQuestion, newOrder.join(','));
                    }}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      (answers[currentQuestion] || '').includes(String(index + 1))
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">{item}</span>
                      {(answers[currentQuestion] || '').includes(String(index + 1)) && (
                        <span className="text-blue-600 font-medium">
                          #{(answers[currentQuestion] || '').split(',').indexOf(String(index + 1)) + 1}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {answers[currentQuestion] && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    Current order: {answers[currentQuestion]}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Media Display */}
          {question.mediaUrl && (
            <div className="mt-4">
              {question.mediaUrl.includes('video') || question.mediaUrl.endsWith('.mp4') || question.mediaUrl.endsWith('.webm') ? (
                <video
                  src={question.mediaUrl}
                  controls
                  className="w-full max-w-md rounded-lg"
                />
              ) : (
                <img
                  src={question.mediaUrl}
                  alt="Question media"
                  className="w-full max-w-md rounded-lg"
                />
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>

            <div className="flex space-x-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded-full text-sm font-medium ${
                    index === currentQuestion
                      ? 'bg-blue-600 text-white'
                      : answers[index] !== undefined
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                onClick={nextQuestion}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Quiz'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TakeQuiz;
