import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import '../styles/RestaurantSection.css';
import SpecialsCard from './SpecialsCard';

const SpecialsSection = ({ title = "Specials & Promotions", restaurants, onViewAll }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

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
        {restaurants.map(p => (
          <SpecialsCard
            key={p.id}
            id={p.id}
            name={p.name}
            rating={p.rating}
            location={p.location}
            distance={p.distance}
            image={p.image}
            promo={p.promo}
            onClick={() => handleCardClick(p.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default SpecialsSection;