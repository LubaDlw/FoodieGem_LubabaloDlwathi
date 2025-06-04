// src/components/RestaurantDetail/RestaurantHeader.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const RestaurantHeader = ({ restaurantId, isFavorite, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFavoriteClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    onFavoriteToggle();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this restaurant!',
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <header className="restaurant-header">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
      </button>
      <div className="header-actions">
        {/* <button className="action-btn" onClick={handleShare}>
          <Share size={20} />
        </button> */}
        <button
          className={`action-btn favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
        >
          <Heart 
            size={20} 
            fill={isFavorite ? '#FF6B35' : 'none'} 
            color={isFavorite ? '#FF6B35' : '#333'} 
          />
        </button>
      </div>
    </header>
  );
};

export default RestaurantHeader;