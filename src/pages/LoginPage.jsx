//LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        // Registration validation
        if (!name || !email || !password || !confirmPassword) {
          setError('Please fill in all fields.');
          setLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          setError('Password must be at least 6 characters long.');
          setLoading(false);
          return;
        }

        // Call register function from AuthContext
        const result = await register(name, email, password);
        
        if (result.success) {
          // Registration successful, redirect to welcome splash
          navigate('/welcome-splash');
        } else {
          setError(result.error || 'Registration failed. Please try again.');
        }
      } else {
        // Login validation
        if (!email || !password) {
          setError('Please enter your email and password.');
          setLoading(false);
          return;
        }

        // Call login function from AuthContext (only email and password)
        const result = await login(email, password);
        
        if (result.success) {
          // Login successful, redirect to welcome splash
          navigate('/welcome-splash');
        } else {
          setError(result.error || 'Invalid credentials. Please try again.');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
    
    setLoading(false);
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setEmail('');
    setName('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-logo">FoodieGem</h1>
        <h2 className="auth-title">
          {isRegistering ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="auth-subtitle">
          {isRegistering ? 'Join the FoodieGem community' : 'Sign in to continue'}
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isRegistering ? "Create a password (min 6 characters)" : "Enter your password"}
              disabled={loading}
            />
          </div>

          {isRegistering && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                disabled={loading}
              />
            </div>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (isRegistering ? 'Creating Account...' : 'Signing In...') : (isRegistering ? 'Create Account' : 'Login')}
          </button>
        </form>

        <div className="auth-links">
          {!isRegistering && (
            <a href="#forgot-password">Forgot Password?</a>
          )}
          
          <div className="auth-separator">
            <span>
              {isRegistering ? 'Already have an account?' : "Don't have an account?"}
            </span>
          </div>
          
          <button
            type="button"
            className="auth-secondary-button"
            onClick={toggleMode}
            disabled={loading}
          >
            {isRegistering ? 'Sign In' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;