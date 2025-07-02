import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getUser, setAuthToken, setUser, logout as apiLogout } from '../api';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  loading: true,
  isAuthenticated: false
};

function authReducer(state, action) {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Auto-login on app start
  useEffect(() => {
    const token = localStorage.getItem('quizmaster_token');
    const userData = localStorage.getItem('quizmaster_user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setAuthToken(token);
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, token }
        });
        
        // Verify token is still valid
        getUser()
          .then(response => {
            dispatch({
              type: 'UPDATE_USER',
              payload: response.data
            });
          })
          .catch(() => {
            // Token invalid, logout
            logout();
          });
      } catch (error) {
        logout();
      }
    } else {
      // Auto-login with demo user for demonstration
      const demoUser = {
        id: 'demo-user-123',
        name: 'Demo User',
        email: 'demo@example.com',
        avatar: null
      };
      const demoToken = 'demo-token-12345';
      
      console.log('Auto-logging in with demo user for demonstration...');
      localStorage.setItem('quizmaster_token', demoToken);
      localStorage.setItem('quizmaster_user', JSON.stringify(demoUser));
      setAuthToken(demoToken);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: demoUser, token: demoToken }
      });
    }
  }, []);

  const login = async (userData, token) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      setAuthToken(token);
      setUser(userData);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: userData, token }
      });

      return { success: true };
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL' });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    apiLogout();
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData) => {
    setUser(userData);
    dispatch({
      type: 'UPDATE_USER',
      payload: userData
    });
  };

  const value = {
    user: state.user,
    token: state.token,
    loading: state.loading,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
