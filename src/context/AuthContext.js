import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Login function - must link to firebase
  const login = (email, password, name) => {
    // For now, simulate a successful login for any input
    setIsAuthenticated(true);
    // Now including the user's name from the form
    setUser({ email, name: name || 'FoodieGem User' });
    return true;
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  // Values to provide in the context
  const value = {
    isAuthenticated,
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};