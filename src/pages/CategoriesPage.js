import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BottomNavigation from '../components/BottomNavigation';
import CategoryCard from '../components/CategoryCard';

import '../styles/CategoriesPage.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([
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
  ]);

  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  

  return (
    <div className="categories-page">
      <Header title="Categories" />

      <div className="categories-container">
        <SearchBar placeholder="Search for categories..." />
        <h1 className="page-title">All Categories</h1>

        <div className="categories-grid-full">
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              name={category.name}
              image={category.image}
              onClick={() => handleCategoryClick(category.name)}
            />
          ))}
        </div>
      </div>

      <BottomNavigation 
     // onNavigate={handleNavigate} 
      activeTab="explore" />
    </div>
  );
};

export default CategoriesPage;
