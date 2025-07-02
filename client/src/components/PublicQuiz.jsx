import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, User, Trophy, Share2 } from 'lucide-react';
import { getPublicQuiz } from '../api';

function PublicQuiz() {
  const { shareId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadQuiz();
  }, [shareId]);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      const response = await getPublicQuiz(shareId);
      setQuiz(response.data);
    } catch (error) {
      console.error('Error loading quiz:', error);
      setError('Quiz not found or not publicly available');
    } finally {
      setLoading(false);
    }
  };

  const shareQuiz = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: quiz.title,
          text: quiz.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Quiz link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Trophy className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Quiz Not Found</h2>
          <p className="text-gray-600 mb-4">
            {error || 'The quiz you\'re looking for doesn\'t exist or is not publicly available.'}
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to QuizMaster
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">QuizMaster</h1>
              <p className="text-sm text-gray-600">Public Quiz</p>
            </div>
            <button
              onClick={shareQuiz}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{quiz.title}</h1>
            
            {quiz.description && (
              <p className="text-lg text-gray-600 mb-6">{quiz.description}</p>
            )}

            <div className="flex justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Trophy className="h-4 w-4 mr-2 text-blue-600" />
                <span>{quiz.questions?.length || 0} Questions</span>
              </div>
              
              {quiz.category && (
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 bg-blue-600 rounded-full"></div>
                  <span>{quiz.category}</span>
                </div>
              )}
              
              {quiz.timeLimit > 0 && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  <span>{quiz.timeLimit} minutes</span>
                </div>
              )}
              
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-blue-600" />
                <span>by {quiz.creator?.name || quiz.creator?.email || 'Anonymous'}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {quiz.tags && quiz.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {quiz.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Ready to test your knowledge?
              </h3>
              <p className="text-blue-700 mb-4">
                Join QuizMaster to take this quiz and track your progress!
              </p>
              
              <div className="space-y-3">
                <a
                  href="/register"
                  className="inline-block w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  Sign Up & Take Quiz
                </a>
                
                <div className="text-sm text-blue-600">
                  Already have an account?{' '}
                  <a href="/login" className="underline hover:text-blue-800">
                    Sign in
                  </a>
                </div>
              </div>
            </div>

            {/* Preview Questions */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview Questions</h3>
              <div className="space-y-4">
                {quiz.questions?.slice(0, 3).map((question, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 text-left">
                    <div className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{question.question}</p>
                        {question.type === 'multiple-choice' && question.options && (
                          <div className="mt-3 space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center text-sm text-gray-600">
                                <div className="w-4 h-4 border border-gray-300 rounded-full mr-2"></div>
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                        {question.type === 'true-false' && (
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <div className="w-4 h-4 border border-gray-300 rounded-full mr-2"></div>
                              True
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <div className="w-4 h-4 border border-gray-300 rounded-full mr-2"></div>
                              False
                            </div>
                          </div>
                        )}
                        {question.type === 'short-answer' && (
                          <div className="mt-3">
                            <div className="w-full h-8 bg-white border border-gray-300 rounded-md"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {quiz.questions?.length > 3 && (
                  <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-600">
                    <p>... and {quiz.questions.length - 3} more questions</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
            <p className="text-sm text-gray-600">
              See your scores and track improvement over time
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-sm text-gray-600">
              Get immediate feedback and explanations
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Share2 className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Share & Compete</h3>
            <p className="text-sm text-gray-600">
              Share your results and compete with friends
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center">
          <div className="inline-block bg-white rounded-lg shadow-sm p-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Ready to get started?
            </h3>
            <p className="text-gray-600 mb-4">
              Join thousands of learners on QuizMaster
            </p>
            <a
              href="/register"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              Create Free Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicQuiz;
