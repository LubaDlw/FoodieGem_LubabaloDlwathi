import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../styles/RestaurantSection.css';
import RestaurantCard from './RestaurantCard';

const RestaurantSection = ({ title = "Popular Restaurants", restaurants, onViewAll }) => {
  return (
    <section className="section">
      <div className="section-header">
        <h2>{title}</h2>
        {onViewAll && (
          <button className="view-all" onClick={onViewAll}>
            View All <ArrowRight size={16} />
          </button>
        )}
      </div>

      <div className="restaurants-grid">
        {restaurants.map(r => (
          <RestaurantCard
            key={r.id}
            id={r.id}
            name={r.name}
            rating={r.rating}
            location={r.location}
            distance={r.distance}
            image={r.image}
          />
        ))}
      </div>
    </section>
  );
};

export default RestaurantSection;
