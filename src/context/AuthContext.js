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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setIsAuthenticated(true);

        try {
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
              favorites: userData.favorites || [],
              completedChallenges: userData.completedChallenges || 0,
              totalChallenges: userData.totalChallenges || 5, // Default total challenges
              ...userData
            });
          } else {
            await setDoc(userDocRef, {
              name: firebaseUser.displayName || 'FoodieGem User',
              email: firebaseUser.email,
              createdAt: new Date(),
              submittedGems: 0,
              gamePoints: 0,
              level: 1,
              badges: [],
              favorites: [],
              completedChallenges: 0,
              totalChallenges: 5
            });
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || 'FoodieGem User',
              submittedGems: 0,
              gamePoints: 0,
              level: 1,
              badges: [],
              favorites: [],
              completedChallenges: 0,
              totalChallenges: 5
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || 'FoodieGem User',
            submittedGems: 0,
            gamePoints: 0,
            level: 1,
            badges: [],
            favorites: [],
            completedChallenges: 0,
            totalChallenges: 5
          });
        }
      } else {
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      await updateProfile(firebaseUser, {
        displayName: name
      });

      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
        submittedGems: 0,
        gamePoints: 0,
        level: 1,
        badges: [],
        favorites: [],
        completedChallenges: 0,
        totalChallenges: 5
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
    if (!user) {
      console.error('updateUserProfile: No user logged in');
      return { success: false, error: 'No user logged in' };
    }

    if (!user.uid) {
      console.error('updateUserProfile: User has no UID');
      return { success: false, error: 'User has no UID' };
    }

    try {
      console.log('Updating user profile:', { uid: user.uid, updates });
      
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, updates);

      // Update local state
      setUser((prev) => ({ ...prev, ...updates }));

      console.log('User profile updated successfully');
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
   * Check and award badges based on user achievements
   */
  const checkAndAwardBadges = async (submittedGems, gamePoints) => {
    if (!user) {
      console.log('checkAndAwardBadges: No user found');
      return;
    }

    const currentBadges = user.badges || [];
    const newBadges = [...currentBadges];
    let badgesAwarded = false;

    console.log('Checking badges for:', { submittedGems, gamePoints, currentBadges });

    // First Gem Badge
    if (submittedGems >= 1 && !currentBadges.includes('firstGem')) {
      newBadges.push('firstGem');
      badgesAwarded = true;
      console.log('Awarded firstGem badge');
    }

    // 5 Gems Badge
    if (submittedGems >= 5 && !currentBadges.includes('fiveGems')) {
      newBadges.push('fiveGems');
      badgesAwarded = true;
      console.log('Awarded fiveGems badge');
    }

    // 10 Gems Badge
    if (submittedGems >= 10 && !currentBadges.includes('tenGems')) {
      newBadges.push('tenGems');
      badgesAwarded = true;
      console.log('Awarded tenGems badge');
    }

    // Point-based badges
    if (gamePoints >= 500 && !currentBadges.includes('pointCollector')) {
      newBadges.push('pointCollector');
      badgesAwarded = true;
      console.log('Awarded pointCollector badge');
    }

    if (gamePoints >= 1000 && !currentBadges.includes('pointMaster')) {
      newBadges.push('pointMaster');
      badgesAwarded = true;
      console.log('Awarded pointMaster badge');
    }

    // Foodie Explorer badge (for having favorites)
    if (user.favorites && user.favorites.length >= 5 && !currentBadges.includes('foodie')) {
      newBadges.push('foodie');
      badgesAwarded = true;
      console.log('Awarded foodie badge');
    }

    // Update badges if new ones were awarded
    if (badgesAwarded) {
      console.log('Updating badges:', newBadges);
      const result = await updateUserProfile({ badges: newBadges });
      if (!result.success) {
        console.error('Failed to update badges:', result.error);
      }
    } else {
      console.log('No new badges to award');
    }
  };

  /**
   * Increment user's submittedGems count and award badges
   */
  const incrementSubmittedGems = async () => {
    console.log('incrementSubmittedGems called');
    
    if (!user) {
      console.error('incrementSubmittedGems: No user found');
      return { success: false, error: 'No user logged in' };
    }

    if (!user.uid) {
      console.error('incrementSubmittedGems: User has no UID');
      return { success: false, error: 'User has no UID' };
    }

    try {
      const currentGems = user.submittedGems || 0;
      const currentPoints = user.gamePoints || 0;
      
      const newCount = currentGems + 1;
      const newPoints = currentPoints + 50; // Award 50 points per gem
      const newLevel = Math.floor(newPoints / 1000) + 1; // Level up every 1000 points

      console.log('Incrementing gems:', {
        currentGems,
        currentPoints,
        newCount,
        newPoints,
        newLevel,
        userId: user.uid
      });

      const updateResult = await updateUserProfile({
        submittedGems: newCount,
        gamePoints: newPoints,
        level: newLevel
      });

      if (!updateResult.success) {
        console.error('Failed to update user profile:', updateResult.error);
        return updateResult;
      }

      // Check and award badges after updating
      await checkAndAwardBadges(newCount, newPoints);

      console.log('Successfully incremented submitted gems');
      return { success: true };
    } catch (error) {
      console.error('Error updating gem count:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Add a restaurant to the user's favorites array
   */
  const addFavorite = async (restaurantId) => {
    if (!user) return { success: false, error: 'No user logged in' };

    try {
      const existing = user.favorites || [];
      if (existing.includes(restaurantId)) {
        return { success: true };
      }

      const newFavorites = [...existing, restaurantId];
      await updateUserProfile({ favorites: newFavorites });

      // Award points for adding favorites
      const newPoints = (user.gamePoints || 0) + 10; // 10 points for adding favorite
      const newLevel = Math.floor(newPoints / 1000) + 1;
      
      await updateUserProfile({ 
        gamePoints: newPoints,
        level: newLevel
      });

      // Check for foodie badge
      await checkAndAwardBadges(user.submittedGems || 0, newPoints);

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
    addFavorite,
    removeFavorite,
    checkAndAwardBadges
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};