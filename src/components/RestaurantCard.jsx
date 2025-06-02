// src/components/RestaurantCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import '../styles/RestaurantCard.css';

const RestaurantCard = ({ id, name, rating, location, image, distance }) => {
  return (
    <Link to={`/restaurant/${id}`} className="restaurant-card-link">
      <div className="restaurant-card">
        <div className="restaurant-image">
          <img src={image} alt={name} />
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
                {distance != null
                  ? `${distance.toFixed(1)} km away`
                  : location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
