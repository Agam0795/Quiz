import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/QuizPerformance.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const QuizPerformance = () => {
  const performanceData = {
    labels: ['React Basics', 'JavaScript', 'CSS', 'Node.js', 'MongoDB', 'Express'],
    datasets: [
      {
        label: 'Average Score (%)',
        data: [85, 78, 65, 72, 80, 68],
        backgroundColor: 'rgba(78, 115, 223, 0.8)',
        borderColor: 'rgba(78, 115, 223, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Quiz Performance Overview',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score (%)',
        },
      },
    },
  };

  return (
    <div className="quiz-performance">
      <div className="chart-container">
        <Bar data={performanceData} options={options} />
      </div>
      <div className="performance-stats">
        <div className="stat-item">
          <span className="stat-label">Highest Performing Quiz:</span>
          <span className="stat-value">React Basics (85%)</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Lowest Performing Quiz:</span>
          <span className="stat-value">CSS (65%)</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Average Completion:</span>
          <span className="stat-value">74.7%</span>
        </div>
      </div>
    </div>
  );
};

export default QuizPerformance;
