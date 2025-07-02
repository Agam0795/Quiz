import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'

console.log('🚀 QuizMaster - All API functions fixed!');

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          backgroundColor: '#fee2e2', 
          border: '1px solid #fca5a5',
          borderRadius: '8px',
          margin: '20px',
          fontFamily: 'Arial, sans-serif'
        }}>
          <h1 style={{ color: '#dc2626' }}>QuizMaster Error</h1>
          <p><strong>Something went wrong:</strong></p>
          <details style={{ textAlign: 'left', backgroundColor: '#fff', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Error Details (Click to expand)</summary>
            <pre style={{ fontSize: '12px', overflow: 'auto', background: '#f9fafb', padding: '10px', borderRadius: '4px' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initialize React app
const container = document.getElementById('root');

if (container) {
  console.log('✅ Root container found, initializing QuizMaster...');
  
  try {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
    console.log('🎉 QuizMaster application rendered successfully!');
  } catch (error) {
    console.error('❌ Failed to render QuizMaster application:', error);
    
    // Fallback error display
    container.innerHTML = `
      <div style="padding: 20px; text-align: center; background-color: #fee2e2; color: #dc2626; font-family: Arial, sans-serif;">
        <h1>Failed to Load QuizMaster</h1>
        <p><strong>Error:</strong> ${error.message}</p>
        <p><strong>Stack:</strong> ${error.stack}</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Retry
        </button>
      </div>
    `;
  }
} else {
  console.error('❌ Root container not found in HTML!');
}
