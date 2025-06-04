// src/components/SubmitGem/RatingSelector.jsx
import React from 'react';
import { Star } from 'lucide-react';

const RatingSelector = ({ rating, onRatingClick }) => (
  <div className="rating-container">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        className={`star-button ${star <= rating ? 'selected' : ''}`}
        onClick={() => onRatingClick(star)}
      >
        <Star
          size={24}
          fill={star <= rating ? '#FFD700' : 'none'}
        />
      </button>
    ))}
    <span className="rating-text">
      {rating > 0 ? `${rating}/5` : 'Tap to rate'}
    </span>
  </div>
);

export default RatingSelector;
