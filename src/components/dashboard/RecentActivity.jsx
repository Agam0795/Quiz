import React from 'react';
import { FaUserCircle, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import './RecentActivity.css';

const activities = [
  {
    id: 1,
    user: 'John Doe',
    action: 'completed',
    quiz: 'React Fundamentals',
    score: 85,
    time: '2 minutes ago',
    status: 'passed'
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'started',
    quiz: 'JavaScript Advanced',
    time: '15 minutes ago',
    status: 'in-progress'
  },
  {
    id: 3,
    user: 'Alex Johnson',
    action: 'completed',
    quiz: 'CSS Grid Mastery',
    score: 62,
    time: '1 hour ago',
    status: 'failed'
  },
  {
    id: 4,
    user: 'Sarah Williams',
    action: 'created',
    quiz: 'Node.js Basics',
    time: '2 hours ago',
    status: 'created'
  },
  {
    id: 5,
    user: 'Mike Brown',
    action: 'completed',
    quiz: 'React Hooks',
    score: 94,
    time: '3 hours ago',
    status: 'passed'
  }
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'passed':
      return <FaCheckCircle className="status-icon passed" />;
    case 'failed':
      return <FaTimesCircle className="status-icon failed" />;
    case 'in-progress':
      return <FaClock className="status-icon in-progress" />;
    default:
      return <FaCheckCircle className="status-icon" />;
  }
};

const RecentActivity = () => {
  return (
    <div className="recent-activity">
      <h3 className="section-title">Recent Activity</h3>
      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-avatar">
              <FaUserCircle size={32} />
            </div>
            <div className="activity-details">
              <div className="activity-header">
                <span className="activity-user">{activity.user}</span>
                <span className="activity-time">{activity.time}</span>
              </div>
              <p className="activity-text">
                {activity.action} "{activity.quiz}"
                {activity.score !== undefined && (
                  <span className={`activity-score ${activity.status}`}>
                    {activity.score}%
                  </span>
                )}
              </p>
            </div>
            <div className="activity-status">
              {getStatusIcon(activity.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
