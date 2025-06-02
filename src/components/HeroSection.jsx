import React from 'react';
import { Search } from 'lucide-react';
import '../styles/HeroSection.css';

const HeroSection = () => (
  <section className="hero-section">
    <h1>Discover the best food around you</h1>
    <div className="search-container">
      <div className="search-icon">
        <Search size={18} />
      </div>
      <input type="text" placeholder="Search for restaurants, cuisines..." />
    </div>
  </section>
);

export default HeroSection;