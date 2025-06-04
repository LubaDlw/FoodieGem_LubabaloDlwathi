// src/components/RestaurantDetail/RestaurantImageCarousel.jsx
import React, { useState } from 'react';

const RestaurantImageCarousel = ({ images, restaurantName, promo }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Ensure we have at least one image
  const allImages = Array.isArray(images) && images.length > 0 ? images : [images];

  return (
    <section className="image-section">
      {promo && <div className="promo-badge">{promo}</div>}
      
      <div className="main-image-container">
        <img
          src={allImages[currentImageIndex]}
          alt={restaurantName}
          className="main-image"
        />
      </div>
      
      {allImages.length > 1 && (
        <div className="image-thumbnails">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(idx)}
            >
              <img src={img} alt={`${restaurantName} ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default RestaurantImageCarousel;