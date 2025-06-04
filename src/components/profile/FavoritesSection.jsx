import React from 'react';
import { Star } from 'lucide-react';

const FavoriteCard = ({ restaurant, onView }) => (
  <div className="favorite-card">
    <img src={restaurant.image} alt={restaurant.name} className="favorite-image" />
    <div className="favorite-info">
      <h4>{restaurant.name}</h4>
      <p className="favorite-meta">
        <Star size={14} fill="#FF6B35" color="#FF6B35" /> 
        {restaurant.rating} • {restaurant.category}
      </p>
      <button className="view-btn" onClick={() => onView(restaurant.id)}>
        View
      </button>
    </div>
  </div>
);

const EmptyFavorites = () => (
  <div className="no-favorites-msg">
    <p>You haven't added any favorites yet.</p>
    <p>❤️ Tap the heart on restaurants to save them here!</p>
  </div>
);

const FavoritesSection = ({ favoriteRestaurants, onNavigateToRestaurant }) => {
  return (
    <div className="favorites-section">
      <h3>Your Favorites ({favoriteRestaurants.length})</h3>
      {favoriteRestaurants.length > 0 ? (
        <div className="favorites-grid">
          {favoriteRestaurants.map((restaurant) => (
            <FavoriteCard
              key={restaurant.id}
              restaurant={restaurant}
              onView={onNavigateToRestaurant}
            />
          ))}
        </div>
      ) : (
        <EmptyFavorites />
      )}
    </div>
  );
};

export default FavoritesSection;