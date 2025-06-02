// src/components/BottomNavigation.jsx

import React from 'react';
import { Home, Search, Gift, User, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/BottomNavigation.css';

const BottomNavigation = ({ activeTab }) => {
  const navigate = useNavigate();

  const handleNavigate = (tab) => {
    const paths = {
      home: '/home',
      explore: '/explore',
      promos: '/promos',
      restaurants: '/restaurants',  // ← New “All Restaurants” route
      profile: '/profile',
    };
    navigate(paths[tab]);
  };

  return (
    <nav className="bottom-nav">
      <div
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => handleNavigate('home')}
      >
        <Home size={20} />
        <span>Home</span>
      </div>

      <div
        className={`nav-item ${activeTab === 'explore' ? 'active' : ''}`}
        onClick={() => handleNavigate('explore')}
      >
        <Search size={20} />
        <span>Explore</span>
      </div>

      {/* New “All Restaurants” tab */}
      <div
        className={`nav-item ${activeTab === 'restaurants' ? 'active' : ''}`}
        onClick={() => handleNavigate('restaurants')}
      >
        <List size={20} />
        <span>All</span>
      </div>

      <div
        className={`nav-item ${activeTab === 'promos' ? 'active' : ''}`}
        onClick={() => handleNavigate('promos')}
      >
        <Gift size={20} />
        <span>Promos</span>
      </div>

      <div
        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => handleNavigate('profile')}
      >
        <User size={20} />
        <span>Profile</span>
      </div>
    </nav>
  );
};

export default BottomNavigation;
