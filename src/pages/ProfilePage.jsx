// src/pages/ProfilePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRestaurants } from '../context/RestaurantContext';
import {
  User,
  Settings,
  Star,
  Trophy,
  Target,
  Gem,
  MapPin,
  FileText,
  HelpCircle,
  Phone,
  ChevronRight,
  Award
} from 'lucide-react';

import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { restaurants, loading: restaurantsLoading } = useRestaurants();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigate to submit a gem
  const handleSubmitGem = () => {
    navigate('/submit-gem');
  };

  // Navigate to edit profile
  const handleChangeDetails = () => {
    navigate('/edit-profile');
  };

  // If restaurants are still loading, show a spinner (optional)
  if (restaurantsLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading favorites...</p>
      </div>
    );
  }

  // Gather the restaurant objects for each favorite ID:
  const favoriteRestaurants = (user?.favorites || []).map((favId) =>
    restaurants.find((r) => r.id === favId)
  ).filter(Boolean); // filter out any missing ones

  // Gamification data from user object (already in AuthContext)
  const submittedGems = user?.submittedGems || 0;
  const gamePoints = user?.gamePoints || 0;
  const level = user?.level || 1;
  const badges = user?.badges || [];
  const completedChallenges = user?.completedChallenges || 0;
  const totalChallenges = user?.totalChallenges || 0;

  const progressPercentage = ((gamePoints / (level * 1000)) * 100).toFixed(0);
  // Adjust “next level” formula as needed. Example: nextLevelPoints = level * 1000.

  // Link sections (unchanged)
  const linkSections = [
    {
      title: 'ACCOUNT',
      items: [
        { icon: Settings, label: 'Account Settings', path: '/settings' },
        { icon: Star, label: 'My Reviews', path: '/my-reviews' },
        { icon: MapPin, label: 'Saved Places', path: '/saved-places' }
      ]
    },
    {
      title: 'SUPPORT',
      items: [
        { icon: FileText, label: 'Documentation', path: '/docs' },
        { icon: HelpCircle, label: 'FAQs', path: '/faqs' },
        { icon: Phone, label: 'Help & Support', path: '/support' }
      ]
    }
  ];

  // Badge definitions (unchanged)
  const badgeDefinitions = {
    foodie: { icon: '🍽️', name: 'Foodie Explorer', color: '#FF6B6B' },
    explorer: { icon: '🗺️', name: 'City Explorer', color: '#4ECDC4' },
    reviewer: { icon: '⭐', name: 'Top Reviewer', color: '#45B7D1' }
    // Add more badge definitions as needed
  };

  return (
    <div className="profile-page">
      <Header title="My Profile" />

      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={40} />
          </div>
          <div className="profile-info">
            <h2>{user?.name || 'Food Explorer'}</h2>
            <p>{user?.email || ''}</p>
          </div>
        </div>

        {/* Change Details Button */}
        <button className="change-details-btn" onClick={handleChangeDetails}>
          <Settings size={20} />
          Change Details
        </button>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-item">
            <Gem size={24} />
            <span className="stat-number">{submittedGems}</span>
            <span className="stat-label">Gems Submitted</span>
          </div>
          <div className="stat-item">
            <Star size={24} />
            <span className="stat-number">{gamePoints}</span>
            <span className="stat-label">Points</span>
          </div>
          <div className="stat-item">
            <Trophy size={24} />
            <span className="stat-number">{badges.length}</span>
            <span className="stat-label">Badges</span>
          </div>
        </div>

        {/* Submit a Gem Button */}
        <button className="submit-gem-btn" onClick={handleSubmitGem}>
          <Gem size={24} />
          <span>SUBMIT A GEM</span>
          <ChevronRight size={20} />
        </button>


<div className="favorites-section">
  <h3>Your Favorites</h3>
  {favoriteRestaurants.length > 0 ? (
    <div className="favorites-grid">
      {favoriteRestaurants.map((fav) => (
        <div key={fav.id} className="favorite-card">
          <img src={fav.image} alt={fav.name} className="favorite-image" />
          <div className="favorite-info">
            <h4>{fav.name}</h4>
            <p className="favorite-meta">
              <Star size={14} fill="#FF6B35" color="#FF6B35" /> {fav.rating} • {fav.category}
            </p>
            <button
              className="view-btn"
              onClick={() => navigate(`/restaurant/${fav.id}`)}
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="no-favorites-msg">You haven’t added any favorites yet.</p>
  )}
</div>


        {/* Gamification Section */}
        <div className="gamification-section">
          <div className="section-header">
            <Trophy size={24} className="section-icon" />
            <div>
              <h3>Your Progress</h3>
              <p>Level {level} Explorer</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-info">
              <span>Game Points</span>
              <span>
                {gamePoints}/{level * 1000}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="progress-text">
              {level * 1000 - gamePoints} points to next level
            </p>
          </div>

          {/* Current Objectives */}
          <div className="objectives-container">
            <div className="objectives-header">
              <Target size={20} />
              <span>Objectives</span>
            </div>
            <div className="objectives-progress">
              <div className="objective-item">
                <span>Complete Challenges</span>
                <span>
                  {completedChallenges}/{totalChallenges}
                </span>
              </div>
              <div className="progress-bar small">
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      totalChallenges > 0
                        ? (completedChallenges / totalChallenges) * 100
                        : 0
                    }%`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="badges-container">
            <h4>Your Badges</h4>
            <div className="badges-grid">
              {badges.map((badgeKey, index) => {
                const badge = badgeDefinitions[badgeKey];
                return (
                  <div
                    key={index}
                    className="badge-item"
                    style={{ borderColor: badge.color }}
                  >
                    <span className="badge-icon">{badge.icon}</span>
                    <span className="badge-name">{badge.name}</span>
                  </div>
                );
              })}
              <div className="badge-item locked">
                <Award size={24} />
                <span className="badge-name">More to unlock!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Links Section */}
        {linkSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="links-section">
            <h3 className="section-title">{section.title}</h3>
            <div className="links-container">
              {section.items.map((item, index) => (
                <button
                  key={index}
                  className="link-item"
                  onClick={() => navigate(item.path)}
                >
                  <div className="link-content">
                    <item.icon size={20} className="link-icon" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="link-arrow" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <BottomNavigation activeTab="profile" />
    </div>
  );
};

export default ProfilePage;
