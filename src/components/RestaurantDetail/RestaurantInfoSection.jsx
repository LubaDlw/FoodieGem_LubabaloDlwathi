import React from 'react';
import { Star } from 'lucide-react';

const RestaurantInfoSection = ({ 
  name, 
  category, 
  avgCost, 
  rating, 
  isOpen = true 
}) => {
  return (
    <div className="restaurant-title-section">
      <div className="restaurant-title">
        <h1>{name}</h1>
        <div className={`status-badge ${isOpen ? 'open' : 'closed'}`}>
          {isOpen ? 'Open' : 'Closed'}
        </div>
      </div>

      <div className="restaurant-meta">
        <div className="meta-left">
          <span className="category">{category}</span>
          <span className="avg-cost">Avg Cost: {avgCost}</span>
        </div>
        <div className="rating-info">
          <Star size={16} fill="#FF6B35" color="#FF6B35" />
          <span>{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfoSection;