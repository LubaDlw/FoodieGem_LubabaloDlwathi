import React from 'react';
import '../styles/CategoryCard.css';

const CategoryCard = ({ name, image, onClick }) => {
  return (
    <div className="category-card" onClick={onClick}>
      <div className="category-image">
        <img src={image} alt={name} />
      </div>
      <p>{name}</p>
    </div>
  );
};

export default CategoryCard;