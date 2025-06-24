import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { register } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (formData) => {
    try {
      const { user, token } = await register(formData);
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Create Account</h1>
        <p>Please fill in your details to register</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <AuthForm type="register" onSubmit={handleRegister} />
        
        <div className="auth-links">
          <p>
            Already have an account?{' '}
            <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 