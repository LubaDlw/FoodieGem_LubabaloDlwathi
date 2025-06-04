// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Will include: { uid, email, name, submittedGems, gamePoints, level, badges, favorites, ... }
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setIsAuthenticated(true);

        try {
          // Get additional user data from Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || userData.name || 'FoodieGem User',
              submittedGems: userData.submittedGems || 0,
              gamePoints: userData.gamePoints || 0,
              level: userData.level || 1,
              badges: userData.badges || [],
              favorites: userData.favorites || [],    // ← pull in favorites array
              // Any other fields from userData you want to merge…
              ...userData
            });
          } else {
            // If somehow the user document is missing, create a minimal one
            await setDoc(userDocRef, {
              name: firebaseUser.displayName || 'FoodieGem User',
              email: firebaseUser.email,
              createdAt: new Date(),
              submittedGems: 0,
              gamePoints: 0,
              level: 1,
              badges: [],
              favorites: []      // initialize empty favorites
            });
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || 'FoodieGem User',
              submittedGems: 0,
              gamePoints: 0,
              level: 1,
              badges: [],
              favorites: []
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Fallback to minimal user object
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || 'FoodieGem User',
            submittedGems: 0,
            gamePoints: 0,
            level: 1,
            badges: [],
            favorites: []
          });
        }
      } else {
        // User is signed out
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  /**
   * Register a new user
   */
  const register = async (name, email, password) => {
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Update display name
      await updateProfile(firebaseUser, {
        displayName: name
      });

      // Save additional user data to Firestore, including an empty favorites array
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
        submittedGems: 0,
        gamePoints: 0,
        level: 1,
        badges: [],
        favorites: []       // initialize empty favorites
      });

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  };

  /**
   * Login with email and password
   */
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  };

  /**
   * Login with name (for backward compatibility)
   * This is a simplified version— in production you'd want proper authentication
   */
  const loginWithName = (name) => {
    setIsAuthenticated(true);
    setUser({ name: name || 'FoodieGem User' });
    return true;
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  };

  /**
   * Update user profile
   */
  const updateUserProfile = async (updates) => {
    if (!user) return { success: false, error: 'No user logged in' };

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, updates); // merge: true by default for updateDoc

      // Update local state
      setUser((prev) => ({ ...prev, ...updates }));

      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  };

  /**
   * Increment user's submittedGems count
   */
  const incrementSubmittedGems = async () => {
    if (!user) return;

    try {
      const newCount = (user.submittedGems || 0) + 1;
      const newPoints = (user.gamePoints || 0) + 50; // Award 50 points per gem

      await updateUserProfile({
        submittedGems: newCount,
        gamePoints: newPoints
      });
    } catch (error) {
      console.error('Error updating gem count:', error);
    }
  };

  /**
   * Add a restaurant to the user's favorites array
   */
  const addFavorite = async (restaurantId) => {
    if (!user) return { success: false, error: 'No user logged in' };

    try {
      // Prevent duplicates
      const existing = user.favorites || [];
      if (existing.includes(restaurantId)) {
        return { success: true };
      }

      const newFavorites = [...existing, restaurantId];
      await updateUserProfile({ favorites: newFavorites });

      return { success: true };
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Remove a restaurant from the user's favorites array
   */
  const removeFavorite = async (restaurantId) => {
    if (!user) return { success: false, error: 'No user logged in' };

    try {
      const existing = user.favorites || [];
      const newFavorites = existing.filter((id) => id !== restaurantId);
      await updateUserProfile({ favorites: newFavorites });

      return { success: true };
    } catch (error) {
      console.error('Error removing from favorites:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    register,
    login,
    loginWithName,
    logout,
    updateUserProfile,
    incrementSubmittedGems,
    addFavorite,        // ← expose favorites helper
    removeFavorite      // ← expose favorites helper
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


