'use client';

import { auth } from './firebase';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  User, 
  signOut, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  AuthError
} from 'firebase/auth';

// Custom error type for better error handling
export interface AuthErrorInfo {
  code: string;
  message: string;
  title: string;
  description: string;
  shouldShowToUser: boolean;
}

// Function to parse Firebase auth errors into user-friendly messages
export const parseAuthError = (error: any): AuthErrorInfo => {
  const defaultError: AuthErrorInfo = {
    code: 'unknown',
    message: error?.message || 'An unknown error occurred',
    title: 'Authentication Error',
    description: 'An unexpected error occurred. Please try again later.',
    shouldShowToUser: true
  };

  if (!error || typeof error.code !== 'string') {
    return defaultError;
  }

  const errorInfo: AuthErrorInfo = {
    code: error.code,
    message: error.message,
    title: 'Authentication Error',
    description: '',
    shouldShowToUser: true
  };

  switch (error.code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      errorInfo.title = 'Sign-in Cancelled';
      errorInfo.description = 'You cancelled the sign-in process.';
      errorInfo.shouldShowToUser = false; // Don't show error toast for user cancellation
      break;
    
    case 'auth/popup-blocked':
      errorInfo.title = 'Popup Blocked';
      errorInfo.description = 'Your browser blocked the sign-in popup. Please allow popups for this site and try again.';
      break;
    
    case 'auth/operation-not-allowed':
      errorInfo.title = 'Sign-in Method Disabled';
      errorInfo.description = 'This sign-in method is not enabled. Please contact support.';
      break;
    
    case 'auth/unauthorized-domain':
      errorInfo.title = 'Unauthorized Domain';
      errorInfo.description = 'This domain is not authorized for sign-in. Please contact support.';
      break;
    
    case 'auth/invalid-api-key':
    case 'auth/api-key-not-valid':
      errorInfo.title = 'Configuration Error';
      errorInfo.description = 'There is a configuration issue. Please contact support.';
      break;
    
    case 'auth/network-request-failed':
      errorInfo.title = 'Network Error';
      errorInfo.description = 'Network connection failed. Please check your internet connection and try again.';
      break;
    
    case 'auth/too-many-requests':
      errorInfo.title = 'Too Many Attempts';
      errorInfo.description = 'Too many failed attempts. Please wait a moment before trying again.';
      break;
    
    case 'auth/user-disabled':
      errorInfo.title = 'Account Disabled';
      errorInfo.description = 'This account has been disabled. Please contact support.';
      break;
    
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      errorInfo.title = 'Invalid Credentials';
      errorInfo.description = 'The email or password you entered is incorrect.';
      break;
    
    case 'auth/invalid-email':
      errorInfo.title = 'Invalid Email';
      errorInfo.description = 'Please enter a valid email address.';
      break;
    
    case 'auth/email-already-in-use':
      errorInfo.title = 'Email In Use';
      errorInfo.description = 'An account with this email already exists. Please sign in instead.';
      break;
    
    case 'auth/weak-password':
      errorInfo.title = 'Weak Password';
      errorInfo.description = 'Password should be at least 6 characters long.';
      break;
    
    default:
      errorInfo.description = `An unexpected error occurred: ${error.message}`;
  }

  return errorInfo;
};

// Enhanced Google sign-in with fallback to redirect
export const signInWithGoogle = async (useRedirect = false): Promise<User> => {
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');
  
  try {
    if (useRedirect) {
      // Use redirect method for mobile or when popup is blocked
      await signInWithRedirect(auth, provider);
      // Note: The result will be handled by getRedirectResult in your app initialization
      throw new Error('redirect_initiated');
    } else {
      // Use popup method (default)
      const result = await signInWithPopup(auth, provider);
      return result.user;
    }
  } catch (error: any) {
    // Handle popup-closed-by-user error silently
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      console.log('User closed the popup, no error to display');
      throw error; // Re-throw but our error handler will not show a toast
    }
    
    // If popup is blocked, automatically try redirect
    if (error.code === 'auth/popup-blocked') {
      console.log('Popup blocked, trying redirect method...');
      await signInWithRedirect(auth, provider);
      throw new Error('redirect_initiated');
    }
    
    const errorInfo = parseAuthError(error);
    console.error("Google sign-in error:", errorInfo);
    throw error;
  }
};

// Function to handle redirect result (call this in your app initialization)
export const handleRedirectResult = async (): Promise<User | null> => {
  try {
    const result = await getRedirectResult(auth);
    return result?.user || null;
  } catch (error) {
    console.error("Redirect result error:", error);
    throw error;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-out error:", error);
    throw error;
  }
};

export const signUpWithEmail = async (name: string, email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // After creating the user, update their profile with the name
    if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
    }
    return userCredential.user;
  } catch (error) {
    const errorInfo = parseAuthError(error);
    console.error("Email sign-up error:", errorInfo);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const errorInfo = parseAuthError(error);
    console.error("Email sign-in error:", errorInfo);
    throw error;
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Check if user is authenticated
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Utility to check if error should be shown to user
export const shouldShowErrorToUser = (error: any): boolean => {
  const errorInfo = parseAuthError(error);
  return errorInfo.shouldShowToUser;
};

// Get user-friendly error message
export const getErrorMessage = (error: any): { title: string; description: string } => {
  const errorInfo = parseAuthError(error);
  return {
    title: errorInfo.title,
    description: errorInfo.description
  };
};
