import React, { useState } from 'react';
import AvailableTests from '../components/quiz/AvailableTests';
import MyResults from '../components/results/MyResults';
import { useAuth } from '../context/AuthContext';
import './CandidateDashboard.css';

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState('availableTests');
  const { currentUser } = useAuth();

  return (
    <div className="candidate-dashboard redesigned">
      <header className="dashboard-header redesigned">
        <div className="welcome-block">
          <h1 className="main-title">Welcome, {currentUser?.name || 'Candidate'}!</h1>
          <p className="subtitle">Take a test and show your skills. Your results will appear here after completion.</p>
        </div>
        <div className="tab-switcher">
          <button
            className={`tab-button ${activeTab === 'availableTests' ? 'active' : ''}`}
            onClick={() => setActiveTab('availableTests')}
          >
            <span role="img" aria-label="tests">📝</span> Available Tests
          </button>
          <button
            className={`tab-button ${activeTab === 'myResults' ? 'active' : ''}`}
            onClick={() => setActiveTab('myResults')}
          >
            <span role="img" aria-label="results">📊</span> My Results
          </button>
        </div>
      </header>
      <main className="dashboard-content redesigned">
        {activeTab === 'availableTests' && <AvailableTests />}
        {activeTab === 'myResults' && <MyResults />}
      </main>
    </div>
  );
};

export default CandidateDashboard;