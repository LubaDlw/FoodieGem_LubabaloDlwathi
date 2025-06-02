import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BottomNavigation from '../components/BottomNavigation';
import RestaurantCard from '../components/RestaurantCard';
import { useRestaurants } from '../context/RestaurantContext';
import '../styles/RestaurantsPage.css';

const RestaurantsPage = () => {
  const { restaurants, loading } = useRestaurants();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // 1. Sort by rating (descending) whenever `restaurants` updates
  const sortedByRating = useMemo(() => {
    if (!restaurants) return [];
    // Make a shallow copy so we don’t mutate context state
    return [...restaurants].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [restaurants]);

  // 2. Filter via search (case‐insensitive) on the sorted list
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return sortedByRating;
    return sortedByRating.filter((r) =>
      r.name.toLowerCase().includes(q)
    );
  }, [searchQuery, sortedByRating]);

  const handleCardClick = (id) => {
    // This mirrors your RestaurantCard’s <Link to={`/restaurant/${id}`}> as well,
    // but if you want programmatic navigation instead of <Link> you can also do:
    navigate(`/restaurant/${id}`);
  };

  

  if (loading) {
    return (
      <div className="restaurants-page">
        <Header title="All Restaurants" />
        <div className="restaurants-container">
          <p>Loading restaurants…</p>
        </div>
        <BottomNavigation 
        //onNavigate={handleNavigate} 
        activeTab="restaurants" />
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
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <h1 className="page-title">Restaurants (Highest Rated First)</h1>

        {filtered.length === 0 ? (
          <p>No restaurants match “{searchQuery}”.</p>
        ) : (
          <div className="restaurants-grid">
            {filtered.map((r) => (
              <RestaurantCard
                key={r.id}
                id={r.id}
                name={r.name}
                image={r.image}
                location={r.location}
                rating={r.rating}
                distance={r.distance}
                onClick={() => handleCardClick(r.id)}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNavigation
      // onNavigate={handleNavigate}
       activeTab="restaurants" />
    </div>
  );
};

export default RestaurantsPage;
