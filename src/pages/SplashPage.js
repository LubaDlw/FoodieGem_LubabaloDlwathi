// Modified SplashPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SplashPage.css';

const SplashPage = ({
  redirectPath = '/login',  // Default redirect path
  duration = 3000,          // Default duration in milliseconds
  message = 'Discover the best food around you' // Default message
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to the specified path after a delay
    const timer = setTimeout(() => {
      navigate(redirectPath);
    }, duration);

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigate, redirectPath, duration]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="logo-container">
          <h1 className="logo-text">FoodieGem</h1>
        </div>
        <p className="tagline">{message}</p>
        <div className="loading-indicator">
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;