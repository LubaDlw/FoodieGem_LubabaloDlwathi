// src/components/RestaurantDetail/LocationTab.jsx
import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const LocationInfo = ({ location, distanceText, phone, openTime, avgCost }) => (
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
);

const MapContainer = ({ location, distanceText }) => {
  const mapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const encodedAddress = encodeURIComponent(location || distanceText || '');

  if (!mapsKey || !encodedAddress) {
    return (
      <div className="map-placeholder">
        <span>Map not available</span>
      </div>
    );
  }

  return (
    <div className="map-container">
      <iframe
        title="restaurant-map"
        width="100%"
        height="200"
        frameBorder="0"
        style={{ border: 0, borderRadius: '12px' }}
        src={
          `https://www.google.com/maps/embed/v1/place` +
          `?key=${mapsKey}` +
          `&q=${encodedAddress}`
        }
        allowFullScreen
      />
    </div>
  );
};

const LocationTab = ({ 
  location, 
  distanceText, 
  phone, 
  openTime, 
  avgCost 
}) => {
  return (
    <div className="tab-content">
      <div className="location-section">
        <h3>Location & Contact</h3>
        
        <LocationInfo 
          location={location}
          distanceText={distanceText}
          phone={phone}
          openTime={openTime}
          avgCost={avgCost}
        />

        <MapContainer 
          location={location}
          distanceText={distanceText}
        />
      </div>
    </div>
  );
};

export default LocationTab;