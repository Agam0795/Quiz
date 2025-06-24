import React from 'react';
import './Sidebar.css';
import { FiGrid, FiFileText, FiHelpCircle, FiBarChart2, FiLogOut } from 'react-icons/fi';

const Sidebar = ({ activeView, setActiveView, onLogout }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <FiGrid /> },
    { id: 'quizzes', label: 'Manage Quizzes', icon: <FiFileText /> },
    { id: 'questions', label: 'Question Bank', icon: <FiHelpCircle /> },
    { id: 'reports', label: 'Reports', icon: <FiBarChart2 /> },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">QuizMaster</h2>
      </div>
      <ul className="sidebar-menu">
        {navItems.map(item => (
          <li key={item.id}>
            <button
              type="button"
              className={`sidebar-link ${activeView === item.id ? 'active' : ''}`}
              onClick={() => setActiveView(item.id)}
            >
              {item.icon}
              <span className="link-text">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <button type="button" className="sidebar-link logout" onClick={onLogout}>
          <FiLogOut />
          <span className="link-text">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
