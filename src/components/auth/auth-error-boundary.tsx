'use client';

import React from 'react';
import { parseAuthError } from '@/lib/auth';

interface AuthErrorBoundaryProps {
  children: React.ReactNode;
}

interface AuthErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class AuthErrorBoundary extends React.Component<AuthErrorBoundaryProps, AuthErrorBoundaryState> {
  constructor(props: AuthErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): AuthErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, reactErrorInfo: React.ErrorInfo) {
    // Log Firebase auth errors but don't show them to users if they're popup-related
    if (error.message.includes('auth/popup-closed-by-user') || 
        error.message.includes('auth/cancelled-popup-request')) {
      console.log('User cancelled authentication popup - not showing error');
      // Reset the error boundary state
      this.setState({ hasError: false, error: undefined });
      return;
    }

    console.error('Auth Error Boundary caught an error:', error, reactErrorInfo);
    
    // Parse the error to see if it should be shown to the user
    const authErrorInfo = parseAuthError(error);
    if (!authErrorInfo.shouldShowToUser) {
      console.log('Error should not be shown to user, resetting boundary');
      this.setState({ hasError: false, error: undefined });
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const authErrorInfo = parseAuthError(this.state.error);
      
      // Only show error UI if it should be shown to the user
      if (authErrorInfo.shouldShowToUser) {
        return (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-card rounded-lg p-6 text-center">
              <h2 className="text-lg font-semibold mb-2">{authErrorInfo.title}</h2>
              <p className="text-muted-foreground mb-4">{authErrorInfo.description}</p>
              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Try Again
              </button>
            </div>
          </div>
        );
      }
    }

    return this.props.children;
  }
}

export default AuthErrorBoundary;
