// src/pages/RestaurantDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurants } from '../context/RestaurantContext';
import { useAuth } from '../context/AuthContext';
import BottomNavigation from '../components/BottomNavigation';

// Import refactored components
import RestaurantHeader from '../components/RestaurantDetail/RestaurantHeader';
import RestaurantImageCarousel from '../components/RestaurantDetail/RestaurantImageCarousel';
import RestaurantInfoSection from '../components/RestaurantDetail/RestaurantInfoSection';
import TabNavigation from '../components/RestaurantDetail/TabNavigation';
import OverviewTab from '../components/RestaurantDetail/OverviewTab';
import MenuTab from '../components/RestaurantDetail/MenuTab';
import LocationTab from '../components/RestaurantDetail/LocationTab';

import '../styles/RestaurantDetailPage.css';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { restaurants, loading } = useRestaurants();
  const { user, addFavorite, removeFavorite } = useAuth();
  
  const [activeTab, setActiveTab] = useState('Overview');
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if restaurant is favorited when user or restaurant loads
  useEffect(() => {
    if (user && user.favorites) {
      setIsFavorite(user.favorites.includes(id));
    }
  }, [user, id]);

  // Handle favorite toggle
  const handleFavoriteToggle = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (isFavorite) {
        const result = await removeFavorite(id);
        if (result.success) {
          setIsFavorite(false);
        }
      } else {
        const result = await addFavorite(id);
        if (result.success) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // Handle adding items to cart (placeholder for future implementation)
  const handleAddToCart = (item) => {
    // TODO: Implement cart functionality
    console.log('Added to cart:', item);
    // You could show a toast notification here
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading restaurant...</p>
      </div>
    );
  }

  // Find restaurant
  const restaurant = restaurants.find((r) => r.id === id);
  
  // Not found state
  if (!restaurant) {
    return (
      <div className="not-found-container">
        <p>Restaurant not found.</p>
        <button onClick={() => navigate(-1)} className="back-btn-simple">
          Go Back
        </button>
      </div>
    );
  }

  // Extract restaurant data with defaults
  const {
    name,
    image,
    avgCost,
    images = [image],
    rating,
    distanceText,
    location,
    promo,
    description = 'Discover amazing flavors and exceptional dining experience at this wonderful restaurant. Our carefully crafted menu features the finest ingredients and authentic recipes.',
    menu = [
      { name: 'Signature Burger', price: '$12.99', image: '🍔', description: 'Juicy beef patty with fresh toppings' },
      { name: 'Crispy Fries', price: '$4.99', image: '🍟', description: 'Golden crispy potato fries' },
      { name: 'Classic Pizza', price: '$16.99', image: '🍕', description: 'Wood-fired pizza with premium toppings' },
      { name: 'Fresh Salad', price: '$8.99', image: '🥗', description: 'Mixed greens with house dressing' },
      { name: 'Grilled Chicken', price: '$14.99', image: '🍗', description: 'Tender grilled chicken breast' },
      { name: 'Pasta Special', price: '$13.99', image: '🍝', description: 'Homemade pasta with rich sauce' }
    ],
    category = 'Restaurant',
    openTime = '9:00 AM - 10:00 PM',
    phone = '+1 (555) 123-4567'
  } = restaurant;

  // Ensure images array
  const allImages = images.length > 0 ? images : [image];

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <OverviewTab
            description={description}
            openTime={openTime}
            phone={phone}
            location={location}
            distanceText={distanceText}
            menu={menu}
          />
        );
      case 'Menu':
        return (
          <MenuTab
            menu={menu}
            onAddToCart={handleAddToCart}
          />
        );
      case 'Location':
        return (
          <LocationTab
            location={location}
            distanceText={distanceText}
            phone={phone}
            openTime={openTime}
            avgCost={avgCost}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="restaurant-detail">
      <RestaurantHeader
        restaurantId={id}
        isFavorite={isFavorite}
        onFavoriteToggle={handleFavoriteToggle}
      />

      <RestaurantImageCarousel
        images={allImages}
        restaurantName={name}
        promo={promo}
      />

      <section className="restaurant-info">
        <RestaurantInfoSection
          name={name}
          category={category}
          avgCost={avgCost}
          rating={rating}
          isOpen={true}
        />

        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {renderTabContent()}
      </section>

      <BottomNavigation activeTab="restaurants" />
    </div>
  );
};

export default RestaurantDetailPage;