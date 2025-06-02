// Custom WelcomeSplash component that uses the user's name
import React from 'react';
import { useAuth } from '../context/AuthContext';
import SplashPage from './SplashPage';

const WelcomeSplash = () => {
  const { user } = useAuth();
  
  // Get the user's name or use a default greeting
  const userName = user?.name || '';
  const welcomeMessage = userName 
    ? `Welcome back, ${userName}! Loading your recommendations...`
    : `Welcome back! Loading your recommendations...`;
  
  return (
    <SplashPage 
      redirectPath="/home" 
      duration={5000} 
      message={welcomeMessage} 
    />
  );
};

export default WelcomeSplash;