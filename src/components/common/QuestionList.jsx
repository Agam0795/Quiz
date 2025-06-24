import React, { useState, useEffect } from 'react';
import { getQuestions } from '../services/questionService';
import QuestionCard from './QuestionCard';

const QuestionList = ({ onEdit, onDelete, isAdmin }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (err) {
        setError('Failed to fetch questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <div className="text-center p-4">Loading questions...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="question-list space-y-4">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onEdit={isAdmin ? onEdit : undefined}
          onDelete={isAdmin ? onDelete : undefined}
        />
      ))}
      {questions.length === 0 && (
        <div className="no-questions p-4 bg-gray-100 rounded-lg text-center">
          <p>No questions available. Add one using the form!</p>
        </div>
      )}
    </div>
  );
};

export default QuestionList;