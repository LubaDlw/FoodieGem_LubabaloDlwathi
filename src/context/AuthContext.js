// src/context/AuthContext.jsx

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Now we store "user" as a simple string (the user's name)
  const [user, setUser] = useState(null);

  /**
   * Login function (for now, simulates success).
   * Signature: (name, email, password)
   * - We require `name` first, since that's our primary identifier.
   */
  const login = (name, email, password) => {
    // In a real Firebase setup you'd do something like:
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // userCredential.user.displayName could be fetched or updated
    //   });

    // Simulate successful login:
    setIsAuthenticated(true);

    // Store only the name (not the email) as `user`
    setUser(name || 'FoodieGem User');

    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,     // now a plain string, e.g. "Alice"
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for consuming the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
