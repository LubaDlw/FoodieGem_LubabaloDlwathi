import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestaurants } from '../context/RestaurantContext';
import SpecialsCard from '../components/SpecialsCard';
import BottomNavigation from '../components/BottomNavigation';
import Header from '../components/Header';

import '../styles/PromosPage.css'; // Optional styling
import '../styles/Header.css';

const PromosPage = () => {
  const { restaurants, loading } = useRestaurants();
  const navigate = useNavigate();

  const promos = restaurants.filter(r => r.promo && r.promo.trim() !== '');


  return (
    
    <div> 
      <Header  />
        <h1>Specials & Promotions</h1>
    <div className="promos-page">
      
      <header className="promos-header">
         
      </header>

      {loading ? (
        <p className="loading">Loading promotions...</p>
      ) : promos.length > 0 ? (
        <div className="promos-grid">
          {promos.map(promo => (
            <SpecialsCard
              key={promo.id}
              name={promo.name}
              rating={promo.rating}
              location={promo.location}
              image={promo.image}
              promo={promo.promo}
              distance={promo.distance}
              onClick={() => navigate(`/restaurant/${promo.id}`)}
            />
          ))}
        </div>
      ) : (
        <p className="no-promos">No specials available at the moment.</p>
      )}

      <BottomNavigation 
      //onNavigate={handleNavigate}
       activeTab="promos" />
    </div>
    </div>
  );
};

export default PromosPage;
