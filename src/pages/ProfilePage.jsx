import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Settings, 
  Star, 
  Trophy, 
  Target, 
  Gift,
  MapPin,
  FileText,
  HelpCircle,
  Phone,
  ChevronRight,
  Award,
  Gem
} from 'lucide-react';

import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Mock gamification data - you can replace with real data from context/API
  const [userStats] = useState({
    gamePoints: 1250,
    level: 5,
    nextLevelPoints: 1500,
    completedChallenges: 12,
    totalChallenges: 20,
    badges: ['foodie', 'explorer', 'reviewer'],
    submittedGems: 3
  });

  const progressPercentage = ((userStats.gamePoints / userStats.nextLevelPoints) * 100).toFixed(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSubmitGem = () => {
    navigate('/submit-gem');
  };

  const handleChangeDetails = () => {
    navigate('/edit-profile');
  };

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

  const badges = {
    foodie: { icon: '🍽️', name: 'Foodie Explorer', color: '#FF6B6B' },
    explorer: { icon: '🗺️', name: 'City Explorer', color: '#4ECDC4' },
    reviewer: { icon: '⭐', name: 'Top Reviewer', color: '#45B7D1' }
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
            <p>{user?.email || 'explorer@foodie.com'}</p>
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
            <span className="stat-number">{userStats.submittedGems}</span>
            <span className="stat-label">Gems Submitted</span>
          </div>
          <div className="stat-item">
            <Star size={24} />
            <span className="stat-number">{userStats.gamePoints}</span>
            <span className="stat-label">Points</span>
          </div>
          <div className="stat-item">
            <Trophy size={24} />
            <span className="stat-number">{userStats.badges.length}</span>
            <span className="stat-label">Badges</span>
          </div>
        </div>

        {/* Submit a Gem Button */}
        <button className="submit-gem-btn" onClick={handleSubmitGem}>
          <Gem size={24} />
          <span>SUBMIT A GEM</span>
          <ChevronRight size={20} />
        </button>

        {/* Gamification Section */}
        <div className="gamification-section">
          <div className="section-header">
            <Trophy size={24} className="section-icon" />
            <div>
              <h3>Your Progress</h3>
              <p>Level {userStats.level} Explorer</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-info">
              <span>Game Points</span>
              <span>{userStats.gamePoints}/{userStats.nextLevelPoints}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="progress-text">
              {userStats.nextLevelPoints - userStats.gamePoints} points to next level
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
                <span>{userStats.completedChallenges}/{userStats.totalChallenges}</span>
              </div>
              <div className="progress-bar small">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(userStats.completedChallenges / userStats.totalChallenges) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="badges-container">
            <h4>Your Badges</h4>
            <div className="badges-grid">
              {userStats.badges.map((badgeKey, index) => {
                const badge = badges[badgeKey];
                return (
                  <div key={index} className="badge-item" style={{ borderColor: badge.color }}>
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

        {/* Links Sections */}
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