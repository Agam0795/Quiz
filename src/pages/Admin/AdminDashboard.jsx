import React, { useState, useEffect } from 'react';
import { FaChartPie, FaClipboardList, FaUsers, FaCog, FaBars, FaTimes } from 'react-icons/fa'; // Removed unused FaSignOutAlt
import DashboardStats from '../../components/DashboardStats';
import RecentActivity from '../../components/dashboard/RecentActivity';
import QuizPerformance from '../../components/QuizPerformance'; // We'll need to create this component
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';
import CreateMCQ from './CreateMCQ';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const { signout } = useAuth(); // Removed unused currentUser
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && sidebarOpen && !e.target.closest('.sidebar') && !e.target.closest('.menu-toggle')) {
        setSidebarOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sign out functionality can be added back when needed
  // const handleSignOut = async () => {
  //   try {
  //     await signout();
  //   } catch (error) {
  //     console.error('Failed to sign out:', error);
  //   }
  // };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            <DashboardStats />
            <div className="dashboard-grid">
              <QuizPerformance />
              <RecentActivity />
            </div>
          </>
        );
      // Add more cases for other views (quizzes, users, settings, etc.)
      case 'createMCQ':
        return <CreateMCQ />;
      default:
        return <div>Coming soon...</div>;
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('dashboard');
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaChartPie className="nav-icon" />
            <span>Dashboard</span>
          </button>
          
          <button 
            className={`nav-item ${activeView === 'quizzes' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('quizzes');
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaClipboardList className="nav-icon" />
            <span>Quizzes</span>
          </button>
          
          <button 
            className={`nav-item ${activeView === 'users' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('users');
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaUsers className="nav-icon" />
            <span>Users</span>
          </button>
          
          <button 
            className={`nav-item ${activeView === 'settings' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('settings');
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaCog className="nav-icon" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <FaBars />
            </button>
            <h1 className="main-title">
              {activeView === 'createMCQ' && 'Create New Test'}
              {activeView === 'dashboard' && 'Dashboard'}
              {activeView === 'quizzes' && 'Quiz Management'}
              {activeView === 'users' && 'User Management'}
              {activeView === 'settings' && 'Settings'}
            </h1>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary" onClick={() => { setActiveView('createMCQ'); if (isMobile) setSidebarOpen(false); }}>
              + Create New
            </button>
          </div>
        </header>
        
        <div className="content-area">
          {renderContent()}
        </div>
      </main>
      
      {/* Overlay for mobile */}
      {sidebarOpen && isMobile && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;