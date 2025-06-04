import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestaurants } from '../context/RestaurantContext';
import SpecialsSection from '../components/SpecialsSection';
import BottomNavigation from '../components/BottomNavigation';
import Header from '../components/Header';

import '../styles/PromosPage.css';
import '../styles/Header.css';

const PromosPage = () => {
  const { restaurants, loading } = useRestaurants();
  const navigate = useNavigate();

  const promos = restaurants.filter(r => r.promo && r.promo.trim() !== '');

  if (loading) {
    return (
      <div className="promos-page">
        <Header title="Specials & Promotions" />
        <div className="promos-container">
          <p>Loading promotions...</p>
        </div>
        <BottomNavigation activeTab="promos" />
      </div>
    );
  }

  return (
    <div className="promos-page">
      <Header title="Specials & Promotions" />

      <div className="promos-container">
        {promos.length > 0 ? (
          <SpecialsSection
            title="Specials & Promotions"
            restaurants={promos}
          />
        ) : (
          <p className="no-promos">No specials available at the moment.</p>
        )}
      </div>

      <BottomNavigation activeTab="promos" />
    </div>
  );
};

export default PromosPage;