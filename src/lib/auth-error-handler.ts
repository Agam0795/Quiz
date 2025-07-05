'use client';

import { AuthErrorInfo, parseAuthError } from '@/lib/auth';

// Global error handler for Firebase auth errors
export const handleAuthError = (error: any, showToast?: (message: { title: string; description: string; variant?: 'default' | 'destructive' }) => void) => {
  console.error('Auth error occurred:', error);
  
  // Parse the error
  const errorInfo: AuthErrorInfo = parseAuthError(error);
  
  // Log the parsed error info
  console.log('Parsed error info:', errorInfo);
  
  // Only show toast if error should be shown to user and toast function is provided
  if (errorInfo.shouldShowToUser && showToast) {
    showToast({
      title: errorInfo.title,
      description: errorInfo.description,
      variant: 'destructive'
    });
  }
  
  return errorInfo;
};

// Global window error handler for unhandled Firebase errors
export const setupGlobalErrorHandler = () => {
  if (typeof window !== 'undefined') {
    const originalErrorHandler = window.onerror;
    
    window.onerror = (message, source, lineno, colno, error) => {
      // Check if this is a Firebase auth error
      if (error && typeof error === 'object' && 'code' in error) {
        const errorCode = error.code;
        
        // Handle popup closed errors silently
        if (errorCode === 'auth/popup-closed-by-user' || 
            errorCode === 'auth/cancelled-popup-request') {
          console.log('Global handler: User cancelled auth popup - suppressing error');
          return true; // Prevent default error handling
        }
        
        // Handle other Firebase auth errors
        if (errorCode && errorCode.startsWith('auth/')) {
          const errorInfo = parseAuthError(error);
          console.log('Global handler: Firebase auth error -', errorInfo);
          
          // Don't show error UI for errors that shouldn't be shown to users
          if (!errorInfo.shouldShowToUser) {
            return true; // Prevent default error handling
          }
        }
      }
      
      // Call original error handler if it exists
      if (originalErrorHandler) {
        return originalErrorHandler(message, source, lineno, colno, error);
      }
      
      return false;
    };
    
    // Also handle unhandled promise rejections
    const originalRejectionHandler = window.onunhandledrejection;
    
    window.onunhandledrejection = (event) => {
      const error = event.reason;
      
      // Check if this is a Firebase auth error
      if (error && typeof error === 'object' && 'code' in error) {
        const errorCode = error.code;
        
        // Handle popup closed errors silently
        if (errorCode === 'auth/popup-closed-by-user' || 
            errorCode === 'auth/cancelled-popup-request') {
          console.log('Global handler: User cancelled auth popup (unhandled promise) - suppressing error');
          event.preventDefault();
          return;
        }
        
        // Handle other Firebase auth errors
        if (errorCode && errorCode.startsWith('auth/')) {
          const errorInfo = parseAuthError(error);
          console.log('Global handler: Firebase auth error (unhandled promise) -', errorInfo);
          
          // Don't show error UI for errors that shouldn't be shown to users
          if (!errorInfo.shouldShowToUser) {
            event.preventDefault();
            return;
          }
        }
      }
      
      // Call original rejection handler if it exists
      if (originalRejectionHandler) {
        originalRejectionHandler(event);
      }
    };
  }
};

// Initialize global error handling
if (typeof window !== 'undefined') {
  setupGlobalErrorHandler();
}
