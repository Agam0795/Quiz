import React, { useState } from 'react';
import { createQuestion } from '../services/questionService';

const QuestionForm = () => {
  const [formData, setFormData] = useState({
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    tags: '',
    difficulty: 'medium'
  });
  
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createQuestion({
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      });
      setFormData({
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        tags: '',
        difficulty: 'medium'
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error creating question:', err);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Add New Question</h2>
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          Question added successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Question</label>
          <textarea
            name="questionText"
            value={formData.questionText}
            onChange={handleChange}
            className="input-field"
            rows="3"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Options</label>
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="radio"
                name="correctAnswer"
                checked={formData.correctAnswer === index}
                onChange={() => setFormData({ ...formData, correctAnswer: index })}
                className="mr-3"
              />
              <input
                type="text"
                value={formData.options[index]}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="input-field flex-grow"
                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                required
              />
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., JavaScript, React"
            />
          </div>
          
          <div>
            <label className="block mb-1 font-medium">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="input-field"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="btn-primary w-full">
          Add Question
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;