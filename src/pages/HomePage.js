import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRestaurants } from '../context/RestaurantContext';

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

  // Full list of all available categories
  const allCategories = [
    { id: 1, name: "Top Rated", image: "../assets/topRated.jpg" },
    { id: 2, name: "Hidden Gems", image: "../assets/seafood.jpg" },
    { id: 3, name: "Seafood", image: "../assets/gourmetCat.jpg" },
    { id: 4, name: "Asian", image: "../assets/asianfood.jpg" },
    { id: 5, name: "Fast Food", image: "../assets/fastfood.jpg" },
    { id: 6, name: "Budget Bites", image: "../assets/budgetBites.jpg" },
    { id: 7, name: "Trending Now", image: "../assets/asianfood.jpg" },
    { id: 8, name: "Near You", image: "../assets/asianfood.jpg" },
    { id: 9, name: "Study and Chill", image: "../assets/asianfood.jpg" },
    { id: 10, name: "Late Night Eats", image: "../assets/lateNight.jpg" },
    { id: 11, name: "Date Night", image: "../assets/dateNight.jpg" },
    { id: 12, name: "Student Favourites", image: "../assets/student.jpg" }
  ];

  // Function to get random categories
  const getRandomCategories = (categories, count = 4) => {
    const shuffled = [...categories].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Set random categories on component mount
  useEffect(() => {
    setRandomCategories(getRandomCategories(allCategories, 4));
  }, []);

  const topRatedRestaurants = restaurants
    .filter(r => typeof r.rating === 'number')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

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

  return (
    <div className="home-page">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="main-content">
        <SearchBar />
        
        <div className="welcome-section">
          <h1>Discover the best food around you</h1>
        </div>

        {loading ? (
          <div className="loading">
            Loading restaurants...
          </div>
        ) : (
          <>
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
          </>
        )}
      </main>
      
      <BottomNavigation 
      activeTab="home" />
    </div>
  );
};

export default HomePage;