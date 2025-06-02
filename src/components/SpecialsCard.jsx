import React from 'react';
import { Star, MapPin } from 'lucide-react';
import '../styles/RestaurantCard.css';

const SpecialsCard = ({ name, rating, location, image, promo, distance, onClick }) => {
  return (
    <div className="restaurant-card" onClick={onClick}>
      <div className="restaurant-image">
        <img src={image} alt={name} />
        {promo && (
          <div className="promo-overlay">
            <span>{promo}</span>
          </div>
        )}
      </div>
      <div className="restaurant-info">
        <h3>{name}</h3>
        <div className="restaurant-details">
          <div className="rating">
            <Star size={16} fill="#FFD700" color="#FFD700" />
            <span>{rating}</span>
          </div>
          <div className="location">
            <MapPin size={16} />
            <span>
              {distance !== undefined && distance !== null
                ? `${distance.toFixed(1)} km away`
                : location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialsCard;
