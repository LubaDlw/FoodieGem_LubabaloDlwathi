import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useRestaurants } from '../context/RestaurantContext';
import { categories } from '../utils/categories';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import CategoryCard from '../components/CategoryCard';
import BottomNavigation from '../components/BottomNavigation';

import '../styles/SearchResultsPage.css';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { restaurants, loading } = useRestaurants();
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');

  const query = searchParams.get('q') || '';

  // Set initial search query from URL params
  useEffect(() => {
    setCurrentSearchQuery(query);
  }, [query]);

  // Filter restaurants using the same logic as RestaurantsPage
  const filteredRestaurants = useMemo(() => {
    if (!restaurants || !currentSearchQuery.trim()) return [];
    
    const searchTerm = currentSearchQuery.toLowerCase();
    
    return restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchTerm) ||
      restaurant.cuisine?.toLowerCase().includes(searchTerm) ||
      restaurant.description?.toLowerCase().includes(searchTerm) ||
      restaurant.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }, [restaurants, currentSearchQuery]);

  // Filter categories
  const filteredCategories = useMemo(() => {
    if (!currentSearchQuery.trim()) return [];
    
    const searchTerm = currentSearchQuery.toLowerCase();
    
    return categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm)
    );
  }, [currentSearchQuery]);

  const handleSearchChange = (searchValue) => {
    setCurrentSearchQuery(searchValue);
    
    // Update URL without navigation if search value exists
    if (searchValue.trim()) {
      const newUrl = `/search?q=${encodeURIComponent(searchValue.trim())}`;
      window.history.replaceState(null, '', newUrl);
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const totalResults = filteredRestaurants.length + filteredCategories.length;

  if (loading) {
    return (
      <div className="search-results-page">
        <Header title="Search Results" showBackButton />
        <div className="search-results-container">
          <p>Loading...</p>
        </div>
        <BottomNavigation activeTab="search" />
      </div>
    );
  }

  return (
    <div className="search-results-page">
      <Header title="Search Results" showBackButton />
      
      <div className="search-results-container">
        <SearchBar 
          placeholder="Search restaurants, cuisines..."
          value={currentSearchQuery}
          onSearch={handleSearchChange}
          autoFocus={!query}
          navigateOnSubmit={false} // Disable navigation since we're already on search page
        />

        {currentSearchQuery && (
          <div className="search-info">
            <h2>Results for "{currentSearchQuery}"</h2>
            <p>{totalResults} {totalResults === 1 ? 'result' : 'results'} found</p>
          </div>
        )}

        {/* Categories Results */}
        {filteredCategories.length > 0 && (
          <section className="search-section">
            <h3>Categories</h3>
            <div className="categories-grid">
              {filteredCategories.map(category => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  image={category.image}
                  onClick={() => handleCategoryClick(category.name)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Restaurants Results */}
        {filteredRestaurants.length > 0 && (
          <section className="search-section">
            <h3>Restaurants</h3>
            <div className="restaurants-grid">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => handleRestaurantClick(restaurant.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {currentSearchQuery && totalResults === 0 && (
          <div className="no-results">
            <h3>No results found</h3>
            <p>Try searching with different keywords or browse our categories.</p>
            <button 
              className="browse-categories-btn"
              onClick={() => navigate('/explore')}
            >
              Browse Categories
            </button>
          </div>
        )}
      </div>

      <BottomNavigation activeTab="search" />
    </div>
  );
};

export default SearchResultsPage;