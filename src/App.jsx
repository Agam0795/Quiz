import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Debug
console.log('App component loading...');

// Pages
const LoginPage = React.lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/Auth/RegisterPage'));
const AdminDashboard = React.lazy(() => import('./pages/Admin/AdminDashboard'));
const CandidateDashboard = React.lazy(() => import('./pages/CandidateDashboard'));
const TestPage = React.lazy(() => import('./pages/TestPage'));
const ResultsPage = React.lazy(() => import('./pages/ResultsPage'));

const LoadingFallback = () => {
  useEffect(() => {
    console.log('Loading fallback component rendered');
  }, []);
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>Loading Application...</h2>
        <p>Please wait while we load the application.</p>
      </div>
    </div>
  );
};

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && currentUser.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const App = () => {
  console.log('App component rendering...');
  
  return (
    <AuthProvider>
      <Router>
        <div className="app" style={{ minHeight: '100vh' }}>
          <React.Suspense fallback={<LoadingFallback />}>
            <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute adminOnly>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <CandidateDashboard />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/test/:quizId"
              element={
                <PrivateRoute>
                  <TestPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/results"
              element={
                <PrivateRoute>
                  <ResultsPage />
                </PrivateRoute>
              }
            />

            {/* Root route - redirect to login */}
            <Route 
              path="/" 
              element={<Navigate to="/login" replace />} 
            />
            </Routes>
          </React.Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App; 