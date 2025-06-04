import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRestaurants } from '../context/RestaurantContext';
import { getRandomCategories } from '../utils/categories'; // Import the utility function

import '../styles/HomePage.css';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategorySection from '../components/CategorySection';
import RestaurantSection from '../components/RestaurantSection';
import SpecialsSection from '../components/SpecialsSection';
import BottomNavigation from '../components/BottomNavigation';

const HomePage = () => {
  const { restaurants, loading } = useRestaurants();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [randomCategories, setRandomCategories] = useState([]);

  // Set random categories on component mount
  useEffect(() => {
    setRandomCategories(getRandomCategories(4));
  }, []);

  // Finding Popular Restaurants
  const topRatedRestaurants = restaurants
    .filter(r => typeof r.rating === 'number')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const promoRestaurants = restaurants.filter(r => r.promo && r.promo.trim() !== '');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleViewAllCategories = () => navigate('/explore');
  const handleViewAllPopular = () => navigate('/restaurants');
  const handleViewAllPromos = () => navigate('/promos');

  // Handle category click - navigate to specific category page
  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  if (loading) {
    return (
      <div className="home-page">
        <Header user={user} onLogout={handleLogout} />
        <div className="home-container">
          <p>Loading restaurants...</p>
        </div>
        <BottomNavigation activeTab="home" />
      </div>
    );
  }

  return (
    <div className="home-page">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="home-container">
        {/* <SearchBar /> */}
        
        <div className="welcome-section">
          <h1>Discover the best food around you</h1>
        </div>

        <CategorySection 
          categories={randomCategories}
          onViewAll={handleViewAllCategories}
          onCategoryClick={handleCategoryClick}
        />
        
        <RestaurantSection 
          title="Popular Restaurants"
          restaurants={topRatedRestaurants}
          onViewAll={handleViewAllPopular}
        />
        
        <SpecialsSection 
          restaurants={promoRestaurants}
          onViewAll={handleViewAllPromos}
        />
      </div>
      
      <BottomNavigation activeTab="home" />
    </div>
  );
};

export default HomePage;