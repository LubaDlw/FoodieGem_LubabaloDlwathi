import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../utils/categories'; 

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BottomNavigation from '../components/BottomNavigation';
import CategoryCard from '../components/CategoryCard';

import '../styles/CategoriesPage.css';

const CategoriesPage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="categories-page">
      <Header title="Categories" />

      <div className="categories-container">
        {/* <SearchBar placeholder="Search for categories..." /> */}
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

      <BottomNavigation activeTab="explore" />
    </div>
  );
};

export default CategoriesPage;