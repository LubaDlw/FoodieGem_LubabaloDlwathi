import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRestaurants } from '../context/RestaurantContext';

import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import ProfileHeader from '../components/profile/ProfileHeader';
import QuickStats from '../components/profile/QuickStats';
import SubmitGemButton from '../components/profile/SubmitGemButton';
import FavoritesSection from '../components/profile/FavoritesSection';
import GamificationSection from '../components/profile/GamificationSection';
import LinkSection from '../components/profile/LinkSection';
import LoadingSpinner from '../components/common/LoadingSpinner';

import { useFavoriteRestaurants } from '../hooks/useFavoriteRestaurants';
import { useProfileNavigation } from '../hooks/useProfileNavigation';

import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { restaurants, loading: restaurantsLoading } = useRestaurants();
  const navigate = useNavigate();

  const { handleLogout, handleSubmitGem } = useProfileNavigation({ logout, navigate });
  const favoriteRestaurants = useFavoriteRestaurants(user?.favorites, restaurants);

  if (restaurantsLoading) {
    return <LoadingSpinner message="Loading favorites..." />;
  }

  return (
    <div className="profile-page">
      <Header title="My Profile" />

      <div className="profile-container">
        <ProfileHeader user={user} />
        
        <QuickStats 
          submittedGems={user?.submittedGems || 0}
          gamePoints={user?.gamePoints || 0}
          badgeCount={user?.badges?.length || 0}
        />
        
        <SubmitGemButton onClick={handleSubmitGem} />
        
        <FavoritesSection 
          favoriteRestaurants={favoriteRestaurants}
          onNavigateToRestaurant={(id) => navigate(`/restaurant/${id}`)}
        />
        
        <GamificationSection user={user} favoriteCount={favoriteRestaurants.length} />
        
        {/* Simplified LinkSection - only shows documentation */}
        <LinkSection onNavigate={navigate} />

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <BottomNavigation activeTab="profile" />
    </div>
  );
};

export default ProfilePage;