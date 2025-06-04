// src/components/RestaurantDetail/OverviewTab.jsx
import React from 'react';
import { Clock, Phone, MapPin } from 'lucide-react';

const ContactInfo = ({ openTime, phone, location, distanceText }) => (
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
);

const FeaturedDishes = ({ menu = [] }) => (
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
);

const OverviewTab = ({ 
  description, 
  openTime, 
  phone, 
  location, 
  distanceText, 
  menu 
}) => {
  return (
    <div className="tab-content">
      <div className="info-section">
        <h3>About</h3>
        <p>{description}</p>
      </div>

      <ContactInfo 
        openTime={openTime}
        phone={phone}
        location={location}
        distanceText={distanceText}
      />

      <FeaturedDishes menu={menu} />
    </div>
  );
};

export default OverviewTab;