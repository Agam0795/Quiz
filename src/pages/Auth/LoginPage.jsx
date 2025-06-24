import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [email, setEmail] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (role, email, password) => {
    try {
      await signin(email, password, role);
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      {/* Animated Background */}
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      {/* App Title */}
      <div className="app-title">
        <h1>MCQ Master</h1>
        <p>Test your knowledge with our assessment platform</p>
      </div>

      {/* Login Cards */}
      <div className="login-cards">
        {/* Candidate Card */}
        <div 
          className={`login-card candidate ${activePanel === 'candidate' ? 'active' : ''}`}
          onMouseEnter={() => setActivePanel('candidate')}
          onMouseLeave={() => setActivePanel(null)}
        >
          <div className="card-content">
            <div className="card-front">
              <div className="card-icon">👤</div>
              <h2>Candidate</h2>
              <p>Take tests and view results</p>
              <div className="hover-hint">Hover to login</div>
            </div>
            <div className="card-back">
              <h3>Candidate Login</h3>
              {error && <div className="error-message">{error}</div>}
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
              <button 
                onClick={() => handleLogin('candidate', email, password)}
                className="login-button"
              >
                Login as Candidate
              </button>
            </div>
          </div>
        </div>

        {/* Admin Card */}
        <div 
          className={`login-card admin ${activePanel === 'admin' ? 'active' : ''}`}
          onMouseEnter={() => setActivePanel('admin')}
          onMouseLeave={() => setActivePanel(null)}
        >
          <div className="card-content">
            <div className="card-front">
              <div className="card-icon">🔐</div>
              <h2>Admin</h2>
              <p>Manage tests and view analytics</p>
              <div className="hover-hint">Hover to login</div>
            </div>
            <div className="card-back">
              <h3>Admin Login</h3>
              {error && <div className="error-message">{error}</div>}
              <input
                type="email"
                placeholder="Admin Email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="login-input"
              />
              <input
                type="password"
                placeholder="Admin Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="login-input"
              />
              <button 
                onClick={() => handleLogin('admin', adminEmail, adminPassword)}
                className="login-button admin"
              >
                Login as Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;