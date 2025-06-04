// src/pages/RestaurantDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurants } from '../context/RestaurantContext';
import { useAuth } from '../context/AuthContext';   // ← import useAuth
import {
  Star,
  MapPin,
  ArrowLeft,
  Clock,
  Phone,
  Share,
  Heart
} from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/RestaurantDetailPage.css';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { restaurants, loading } = useRestaurants();
  const { user, addFavorite, removeFavorite } = useAuth();  // ← grab user + helpers
  const [activeTab, setCurrentTab] = useState('Overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Wait until restaurants & user load, then mark if this restaurant is favorited
  useEffect(() => {
    if (user && user.favorites) {
      setIsFavorite(user.favorites.includes(id));
    }
  }, [user, id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading restaurant...</p>
      </div>
    );
  }

  const restaurant = restaurants.find((r) => r.id === id);
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

  const allImages = images.length > 0 ? images : [image];
  const mapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const encodedAddress = encodeURIComponent(location || '');

  // Toggle favorite on heart click:
  const handleFavoriteToggle = async () => {
    if (!user) {
      // Optionally: redirect to login if no user
      navigate('/login');
      return;
    }

    if (isFavorite) {
      // Remove from favorites
      const result = await removeFavorite(id);
      if (result.success) {
        setIsFavorite(false);
      }
    } else {
      // Add to favorites
      const result = await addFavorite(id);
      if (result.success) {
        setIsFavorite(true);
      }
    }
  };

  const TabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="tab-content">
            <div className="info-section">
              <h3>About</h3>
              <p>{description}</p>
            </div>

            <div className="contact-info">
              <div className="contact-item">
                <Clock size={18} />
                <span>{openTime}</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>{phone}</span>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <span>{location || distanceText}</span>
              </div>
            </div>

            <div className="featured-section">
              <h3>Featured Dishes</h3>
              <div className="featured-grid">
                {menu.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="featured-card">
                    <div className="dish-icon">{item.image}</div>
                    <div className="dish-info">
                      <h4>{item.name}</h4>
                      <p className="dish-price">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Menu':
        return (
          <div className="tab-content">
            <div className="menu-section">
              <h3>Full Menu</h3>
              <div className="menu-grid">
                {menu.map((item, idx) => (
                  <div key={idx} className="menu-item">
                    <div className="menu-item-icon">{item.image}</div>
                    <div className="menu-item-details">
                      <h4>{item.name}</h4>
                      <p className="menu-item-description">{item.description}</p>
                      <p className="menu-item-price">{item.price}</p>
                    </div>
                    <button className="add-btn">+</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Location':
        return (
          <div className="tab-content">
            <div className="location-section">
              <h3>Location & Contact</h3>
              <div className="location-info">
                <div className="location-item">
                  <MapPin size={20} />
                  <div>
                    <h4>Address</h4>
                    <p>{location || distanceText}</p>
                  </div>
                </div>
                <div className="location-item">
                  <Phone size={20} />
                  <div>
                    <h4>Phone</h4>
                    <p>{phone}</p>
                  </div>
                </div>
                <div className="location-item">
                  <Clock size={20} />
                  <div>
                    <h4>Hours</h4>
                    <p>{openTime}</p>
                  </div>
                </div>
                <div className="location-item">
                  <Clock size={20} />
                  <div>
                    <h4>Average Cost</h4>
                    <p>{avgCost}</p>
                  </div>
                </div>
              </div>

              <div className="map-container">
                <iframe
                  title="restaurant-map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={
                    `https://www.google.com/maps/embed/v1/place` +
                    `?key=${mapsKey}` +
                    `&q=${encodedAddress}`
                  }
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="restaurant-detail">
      {/* Header */}
      <header className="restaurant-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div className="header-actions">
          <button className="action-btn">
            <Share size={20} />
          </button>
          <button
            className={`action-btn favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={handleFavoriteToggle}
          >
            <Heart size={20} fill={isFavorite ? '#FF6B35' : 'none'} color={isFavorite ? '#FF6B35' : '#333'} />
          </button>
        </div>
      </header>

      {/* Image Carousel */}
      <section className="image-section">
        {promo && <div className="promo-badge">{promo}</div>}
        <div className="main-image-container">
          <img
            src={allImages[currentImageIndex]}
            alt={name}
            className="main-image"
          />
        </div>
        {allImages.length > 1 && (
          <div className="image-thumbnails">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(idx)}
              >
                <img src={img} alt={`${name} ${idx + 1}`} />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Restaurant Info */}
      <section className="restaurant-info">
        <div className="restaurant-title">
          <h1>{name}</h1>
          <div className="status-badge">Open</div>
        </div>

        <div className="restaurant-meta">
          <div className="meta-left">
            <span className="category">{category}</span>
            <span className="avg-cost">Avg Cost: {avgCost}</span>
          </div>
          <div className="rating-info">
            <Star size={16} fill="#FF6B35" color="#FF6B35" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="tab-navigation">
          {['Overview', 'Menu', 'Location'].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <TabContent />
      </section>

      <BottomNavigation activeTab="restaurants" />
    </div>
  );
};

export default RestaurantDetailPage;
