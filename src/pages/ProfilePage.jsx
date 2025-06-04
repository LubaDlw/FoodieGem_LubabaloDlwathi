// src/pages/ProfilePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRestaurants } from '../context/RestaurantContext';
import {
  User,
  Star,
  Trophy,
  Target,
  Gem,
  MapPin,
  FileText,
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

  // If restaurants are still loading, show a spinner
  if (restaurantsLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading favorites...</p>
      </div>
    );
  }

  // Gather the restaurant objects for each favorite ID
  const favoriteRestaurants = (user?.favorites || []).map((favId) =>
    restaurants.find((r) => r.id === favId)
  ).filter(Boolean);

  // Gamification data from user object
  const submittedGems = user?.submittedGems || 0;
  const gamePoints = user?.gamePoints || 0;
  const level = user?.level || 1;
  const badges = user?.badges || [];
  const completedChallenges = user?.completedChallenges || 0;
  const totalChallenges = user?.totalChallenges || 5;

  const progressPercentage = ((gamePoints / (level * 1000)) * 100).toFixed(0);

  // Updated link sections (removed Account Settings and Change Details)
  const linkSections = [
    {
      title: 'ACCOUNT',
      items: [
        { icon: Star, label: 'My Reviews', path: '/my-reviews' },
        { icon: MapPin, label: 'Saved Places', path: '/saved-places' }
      ]
    },
    {
      title: 'SUPPORT',
      items: [
        { icon: FileText, label: 'Documentation', path: '/docs' }
      ]
    }
  ];

  // Enhanced badge definitions with gem-specific badges
  const badgeDefinitions = {
    // Gem submission badges
    firstGem: { icon: '💎', name: 'First Gem', color: '#FF6B6B', description: 'Submitted your first gem!' },
    fiveGems: { icon: '🔥', name: 'Gem Hunter', color: '#FF8C42', description: 'Submitted 5 gems!' },
    tenGems: { icon: '👑', name: 'Gem Master', color: '#FFD700', description: 'Submitted 10 gems!' },
    
    // Point-based badges
    pointCollector: { icon: '⭐', name: 'Point Collector', color: '#45B7D1', description: 'Earned 500 points!' },
    pointMaster: { icon: '🏆', name: 'Point Master', color: '#8E44AD', description: 'Earned 1000 points!' },
    
    // Favorite-based badges
    foodie: { icon: '🍽️', name: 'Foodie Explorer', color: '#4ECDC4', description: 'Added 5+ favorites!' },
    explorer: { icon: '🗺️', name: 'City Explorer', color: '#2ECC71', description: 'Explored the city!' },
    reviewer: { icon: '📝', name: 'Top Reviewer', color: '#E74C3C', description: 'Active reviewer!' }
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

        {/* Favorites Section */}
        <div className="favorites-section">
          <h3>Your Favorites ({favoriteRestaurants.length})</h3>
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
            <div className="no-favorites-msg">
              <p>You haven't added any favorites yet.</p>
              <p>❤️ Tap the heart on restaurants to save them here!</p>
            </div>
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
            <h4>Your Badges ({badges.length})</h4>
            <div className="badges-grid">
              {badges.map((badgeKey, index) => {
                const badge = badgeDefinitions[badgeKey];
                if (!badge) return null;
                return (
                  <div
                    key={index}
                    className="badge-item earned"
                    style={{ borderColor: badge.color }}
                    title={badge.description}
                  >
                    <span className="badge-icon">{badge.icon}</span>
                    <span className="badge-name">{badge.name}</span>
                  </div>
                );
              })}
              
              {/* Show next available badges */}
              {submittedGems === 0 && !badges.includes('firstGem') && (
                <div className="badge-item locked" title="Submit your first gem to unlock!">
                  <span className="badge-icon">💎</span>
                  <span className="badge-name">First Gem</span>
                </div>
              )}
              
              {submittedGems < 5 && submittedGems > 0 && !badges.includes('fiveGems') && (
                <div className="badge-item locked" title={`Submit ${5 - submittedGems} more gems to unlock!`}>
                  <span className="badge-icon">🔥</span>
                  <span className="badge-name">Gem Hunter</span>
                </div>
              )}
              
              {favoriteRestaurants.length < 5 && !badges.includes('foodie') && (
                <div className="badge-item locked" title={`Add ${5 - favoriteRestaurants.length} more favorites to unlock!`}>
                  <span className="badge-icon">🍽️</span>
                  <span className="badge-name">Foodie Explorer</span>
                </div>
              )}
              
              {badges.length === 0 && (
                <div className="badge-item locked">
                  <Award size={24} />
                  <span className="badge-name">Start earning badges!</span>
                </div>
              )}
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