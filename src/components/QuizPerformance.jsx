import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const QuizPerformance = () => {
  // Sample data - replace with actual data from props
  const data = {
    labels: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5', 'Quiz 6'],
    datasets: [
      {
        label: 'Your Score',
        data: [65, 78, 82, 75, 86, 90],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Class Average',
        data: [58, 65, 70, 72, 75, 80],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.3,
        fill: true,
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
        text: 'Quiz Performance Over Time',
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
        <Line data={data} options={options} />
      </div>
      <div className="performance-stats">
        <div className="stat">
          <h4>Highest Score</h4>
          <p className="score">90%</p>
          <p className="quiz-name">Quiz 6</p>
        </div>
        <div className="stat">
          <h4>Average</h4>
          <p className="score">79.3%</p>
          <p className="trend up">+5.2% from last period</p>
        </div>
        <div className="stat">
          <h4>Quizzes Taken</h4>
          <p className="score">6</p>
          <p className="trend up">+2 from last period</p>
        </div>
      </div>
    </div>
  );
};

export default QuizPerformance;
