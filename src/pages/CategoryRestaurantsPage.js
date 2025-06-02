// src/pages/CategoryRestaurantsPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurants } from '../context/RestaurantContext';

import Header from '../components/Header';
import RestaurantCard from '../components/RestaurantCard';
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



  return (
    <div className="category-restaurants-page">
      <Header title={categoryName} />

      <div className="category-header">
        <h1>{categoryName} Restaurants</h1>
      </div>

      <div className="restaurants-grid">
        {loading ? (
          <p>Loading...</p>
        ) : filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((r) => (
            <RestaurantCard
              key={r.id}
              id={r.id}
              name={r.name}
              rating={r.rating}
              location={r.location}
              image={r.image}
              distance={r.distance}
            />
          ))
        ) : (
          <p className="no-results">
            No restaurants found in this category.
          </p>
        )}
      </div>

      <BottomNavigation
        //onNavigate={handleNavigate}
        activeTab="explore"
      />
    </div>
  );
};

export default CategoryRestaurantsPage;
