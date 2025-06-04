// src/pages/CategoryRestaurantsPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurants } from '../context/RestaurantContext';

import Header from '../components/Header';
import RestaurantSection from '../components/RestaurantSection';
import BottomNavigation from '../components/BottomNavigation';

import '../styles/CategoryRestaurantsPage.css';

const CategoryRestaurantsPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { restaurants, loading } = useRestaurants();

  // Filter restaurants whose `category` array includes this category name (case-insensitive)
  const filteredRestaurants = restaurants.filter((r) =>
    Array.isArray(r.category) &&
    r.category.some(
      (cat) => cat.toLowerCase() === categoryName.toLowerCase()
    )
  );

  if (loading) {
    return (
      <div className="category-restaurants-page">
        <Header title={categoryName} />
        <div className="category-container">
          <p>Loading restaurants...</p>
        </div>
        <BottomNavigation activeTab="explore" />
      </div>
    );
  }

  return (
    <div className="category-restaurants-page">
      <Header title={categoryName} />

      <div className="category-container">
        {filteredRestaurants.length > 0 ? (
          <RestaurantSection
            title={`${categoryName} Restaurants`}
            restaurants={filteredRestaurants}
          />
        ) : (
          <p className="no-results">
            No restaurants found in this category.
          </p>
        )}
      </div>

      <BottomNavigation activeTab="explore" />
    </div>
  );
};

export default CategoryRestaurantsPage;