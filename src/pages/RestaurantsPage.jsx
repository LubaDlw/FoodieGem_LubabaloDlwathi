import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BottomNavigation from '../components/BottomNavigation';
import RestaurantSection from '../components/RestaurantSection';
import { useRestaurants } from '../context/RestaurantContext';
import '../styles/RestaurantsPage.css';

const RestaurantsPage = () => {
  const { restaurants, loading } = useRestaurants();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // 1. Sort by rating (descending) whenever `restaurants` updates
  const sortedByRating = useMemo(() => {
    if (!restaurants) return [];
    // Make a shallow copy so we don't mutate context state
    return [...restaurants].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [restaurants]);

  // 2. Filter via search (case‐insensitive) on the sorted list
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return sortedByRating;
    return sortedByRating.filter((r) =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine?.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q) ||
      r.tags?.some(tag => tag.toLowerCase().includes(q))
    );
  }, [searchQuery, sortedByRating]);

  const handleSearchChange = (searchValue) => {
    setSearchQuery(searchValue);
  };

  if (loading) {
    return (
      <div className="restaurants-page">
        <Header title="All Restaurants" />
        <div className="restaurants-container">
          <p>Loading restaurants…</p>
        </div>
        <BottomNavigation activeTab="restaurants" />
      </div>
    );
  }

  return (
    <div className="restaurants-page">
      <Header title="All Restaurants" />

      <div className="restaurants-container">
        <SearchBar
          placeholder="Search for restaurants..."
          value={searchQuery}
          onSearch={handleSearchChange}
        />

        {searchQuery && filtered.length === 0 ? (
          <p>No restaurants match "{searchQuery}".</p>
        ) : (
          <RestaurantSection
            title="Restaurants (Highest Rated First)"
            restaurants={filtered}
          />
        )}
      </div>

      <BottomNavigation activeTab="restaurants" />
    </div>
  );
};

export default RestaurantsPage;