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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardStats = ({ stats }) => {
  // Sample data - replace with actual data from props
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Tests Taken',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
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
        text: 'Monthly Test Statistics',
      },
    },
  };

  return (
    <div className="dashboard-stats">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tests</h3>
          <p className="stat-number">1,234</p>
          <p className="stat-change">+12% from last month</p>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <p className="stat-number">543</p>
          <p className="stat-change">+8% from last month</p>
        </div>
        <div className="stat-card">
          <h3>Avg. Score</h3>
          <p className="stat-number">78%</p>
          <p className="stat-change">+5% from last month</p>
        </div>
      </div>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DashboardStats;
