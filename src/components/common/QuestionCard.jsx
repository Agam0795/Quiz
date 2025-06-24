import React from 'react';

const QuestionCard = ({ question, selectedOption, onAnswerSelect, questionNumber, totalQuestions }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-indigo-100 text-indigo-700 font-medium py-1 px-3 rounded-full">
          Question {questionNumber} of {totalQuestions}
        </div>
        <div className="bg-gray-100 text-gray-700 font-medium py-1 px-3 rounded-full">
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </div>
      </div>
      
      <h3 className="text-lg font-medium mb-6">{question.questionText}</h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => onAnswerSelect(question._id, index)}
            className={`p-4 border rounded-lg cursor-pointer transition ${
              selectedOption === index
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                selectedOption === index
                  ? 'border-indigo-500 bg-indigo-500 text-white'
                  : 'border-gray-300'
              }`}>
                {selectedOption === index && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span>{option}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;