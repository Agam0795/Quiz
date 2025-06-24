import React from 'react';
import { FaUsers, FaClipboardList, FaChartLine, FaClock } from 'react-icons/fa';
import '../styles/DashboardStats.css';

const statCards = [
  { 
    title: 'Total Users', 
    value: '1,234', 
    icon: <FaUsers className="stat-icon" />,
    color: '#4e73df',
    trend: '12% increase from last month'
  },
  { 
    title: 'Active Quizzes', 
    value: '24', 
    icon: <FaClipboardList className="stat-icon" />,
    color: '#1cc88a',
    trend: '3 new this week'
  },
  { 
    title: 'Avg. Score', 
    value: '78%', 
    icon: <FaChartLine className="stat-icon" />,
    color: '#36b9cc',
    trend: '5% increase from last month'
  },
  { 
    title: 'Avg. Time', 
    value: '12:34', 
    icon: <FaClock className="stat-icon" />,
    color: '#f6c23e',
    trend: '2 min less than last month'
  }
];

const DashboardStats = () => {
  return (
    <div className="dashboard-stats">
      {statCards.map((stat, index) => (
        <div key={index} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
          <div className="stat-content">
            <div className="stat-icon-container" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-text">
              <h3 className="stat-title">{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-trend">{stat.trend}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
