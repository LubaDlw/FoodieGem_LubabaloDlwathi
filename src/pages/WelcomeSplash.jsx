import React from 'react';
import { useAuth } from '../context/AuthContext';
import SplashPage from './SplashPage';

const WelcomeSplash = () => {
  const { user, loading } = useAuth();
  
  // Debug what we're getting from auth
  console.log('WelcomeSplash Debug:', {
    user: user,
    userType: typeof user,
    loading: loading
  });
  
  // Handle loading state
  if (loading) {
    return (
      <SplashPage 
        redirectPath="/home" 
        duration={3000} 
        message="Loading your profile..."
      />
    );
  }
  
  // Ensure we have a valid string for the user name
  let userName = '';
  
  if (user && typeof user === 'object') {
    // Safely extract name, ensuring it's a string
    userName = String(user.name || user.displayName || '').trim();
  }
  
  const welcomeMessage = userName 
    ? `Welcome back, ${userName}! Loading your recommendations...`
    : 'Welcome back! Loading your recommendations...';
  
  console.log('Final welcomeMessage:', welcomeMessage);
  
  return (
    <SplashPage 
      redirectPath="/home" 
      duration={5000} 
      message={welcomeMessage}
    />
  );
};

export default WelcomeSplash;