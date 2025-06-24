import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuiz } from '../../services/quizService';
import './CreateMCQ.css';

const CreateMCQ = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(15);
  const [questions, setQuestions] = useState([
    { text: '', options: ['', ''], correctAnswer: 0 }
  ]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleQuestionTextChange = (qIdx, value) => {
    const newQuestions = [...questions];
    newQuestions[qIdx].text = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    const newQuestions = [...questions];
    newQuestions[qIdx].options[optIdx] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectChange = (qIdx, optIdx) => {
    const newQuestions = [...questions];
    newQuestions[qIdx].correctAnswer = optIdx;
    setQuestions(newQuestions);
  };

  const addOption = (qIdx) => {
    const newQuestions = [...questions];
    newQuestions[qIdx].options.push('');
    setQuestions(newQuestions);
  };

  const removeOption = (qIdx, optIdx) => {
    const newQuestions = [...questions];
    newQuestions[qIdx].options.splice(optIdx, 1);
    if (newQuestions[qIdx].correctAnswer >= newQuestions[qIdx].options.length) {
      newQuestions[qIdx].correctAnswer = 0;
    }
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', options: ['', ''], correctAnswer: 0 }
    ]);
  };

  const removeQuestion = (qIdx) => {
    setQuestions(questions.filter((_, i) => i !== qIdx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Basic validation
    if (!title.trim()) {
      setError('Quiz title is required.');
      return;
    }
    for (let q of questions) {
      if (!q.text.trim()) {
        setError('All questions must have text.');
        return;
      }
      if (q.options.some(opt => !opt.trim())) {
        setError('All options must have text.');
        return;
      }
    }
    setSubmitting(true);
    const quizData = {
      title,
      description,
      duration,
      questions: questions.map(q => ({
        question: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer
      }))
    };
    try {
      await createQuiz(quizData);
      navigate('/admin');
    } catch (err) {
      console.error('Create quiz error:', err);
      // Show detailed error message if available
      const errorMsg = err.response?.data?.message || err.response?.statusText || err.message || 'Failed to create quiz. Please try again.';
      setError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-mcq-container">
      <h2>Create New Quiz</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="create-mcq-form">
        <div className="field">
          <label>Title *</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={2}
          />
        </div>
        <div className="field">
          <label>Duration (minutes) *</label>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={e => setDuration(parseInt(e.target.value) || 1)}
            required
          />
        </div>
        {questions.map((q, qIdx) => (
          <div key={qIdx} className="question-block">
            <div className="field">
              <label>Question {qIdx + 1} *</label>
              <input
                type="text"
                value={q.text}
                onChange={e => handleQuestionTextChange(qIdx, e.target.value)}
                required
              />
            </div>
            <div className="options-list">
              {q.options.map((opt, optIdx) => (
                <div key={optIdx} className="option-block">
                  <input
                    type="text"
                    value={opt}
                    onChange={e => handleOptionChange(qIdx, optIdx, e.target.value)}
                    placeholder={`Option ${optIdx + 1}`}
                    required
                  />
                  <label>
                    <input
                      type="radio"
                      name={`correct-${qIdx}`}
                      checked={q.correctAnswer === optIdx}
                      onChange={() => handleCorrectChange(qIdx, optIdx)}
                    />
                    Correct
                  </label>
                  {q.options.length > 2 && (
                    <button
                      type="button"
                      className="remove-opt-btn"
                      onClick={() => removeOption(qIdx, optIdx)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="add-opt-btn" onClick={() => addOption(qIdx)}>
                + Add Option
              </button>
            </div>
            {questions.length > 1 && (
              <button
                type="button"
                className="remove-ques-btn"
                onClick={() => removeQuestion(qIdx)}
              >
                Remove Question
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-ques-btn" onClick={addQuestion}>
          + Add Question
        </button>
        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Quiz'}
        </button>
      </form>
    </div>
  );
};

export default CreateMCQ;
