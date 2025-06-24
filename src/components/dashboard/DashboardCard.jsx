import React from 'react';

const DashboardCard = ({ title, value, icon, trend }) => {
  return (
    <div className="dashboard-card">
      <div className="card-icon">
        {icon}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <div className="card-value">{value}</div>
        {trend && (
          <div className={`trend ${trend.type}`}>
            <span className="trend-value">{trend.value}%</span>
            <span className="trend-label">{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard; 