import React, { useState, useEffect } from 'react';
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
  const { restaurants } = useRestaurants();
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      searchContent(query);
      setIsLoading(false);
    } else {
      setFilteredRestaurants([]);
      setFilteredCategories([]);
    }
  }, [query, restaurants]);

  const searchContent = (searchTerm) => {
    const lowercaseQuery = searchTerm.toLowerCase();

    // Search restaurants
    const matchingRestaurants = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(lowercaseQuery) ||
      restaurant.cuisine?.toLowerCase().includes(lowercaseQuery) ||
      restaurant.description?.toLowerCase().includes(lowercaseQuery) ||
      restaurant.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );

    // Search categories
    const matchingCategories = categories.filter(category =>
      category.name.toLowerCase().includes(lowercaseQuery)
    );

    setFilteredRestaurants(matchingRestaurants);
    setFilteredCategories(matchingCategories);
  };

  const handleNewSearch = (newQuery) => {
    if (newQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(newQuery.trim())}`);
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const totalResults = filteredRestaurants.length + filteredCategories.length;

  return (
    <div className="search-results-page">
      <Header title="Search Results" showBackButton />
      
      <div className="search-results-container">
        <SearchBar 
          placeholder="Search restaurants, cuisines..."
          onSearch={handleNewSearch}
          autoFocus={!query}
        />

        {query && (
          <div className="search-info">
            <h2>Results for "{query}"</h2>
            <p>{totalResults} {totalResults === 1 ? 'result' : 'results'} found</p>
          </div>
        )}

        {isLoading ? (
          <div className="loading">Searching...</div>
        ) : (
          <>
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
            {query && totalResults === 0 && (
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
          </>
        )}
      </div>

      <BottomNavigation activeTab="search" />
    </div>
  );
};

export default SearchResultsPage;