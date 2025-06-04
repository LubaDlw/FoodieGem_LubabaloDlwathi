// src/context/RestaurantContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import getLatLngFromAddress from '../utils/getLatLngFromAddress';
import calculateDistance from '../utils/calculateDistance';
const RestaurantContext = createContext();
export const useRestaurants = () => useContext(RestaurantContext);
export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {

      const snapshot = await getDocs(collection(db, 'restaurants'));
      const raw = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      let userLocation = null;
      try {
        userLocation = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            () => resolve(null)
          );
        });
      } catch (e) {
        console.warn('Geolocation error:', e);
      }

      const enriched = await Promise.all(raw.map(async restaurant => {
        try {
          const coords = await getLatLngFromAddress(restaurant.location);

          if (!coords) {
            console.warn(`Could not geocode address for ${restaurant.name}: ${restaurant.location}`);
            return restaurant;
          }

          if (!userLocation) {
            return restaurant;
          }

          const distance = calculateDistance(
            userLocation.lat, userLocation.lng,
            coords.lat, coords.lng
          );

          return {
            ...restaurant,
            distance,
            distanceText: `${distance.toFixed(2)} km`,
          };
        } catch (error) {
          console.error(`Error processing restaurant "${restaurant.name}":`, error);
          return restaurant;
        }
      }));

      setRestaurants(enriched);
      sessionStorage.setItem('restaurants', JSON.stringify(enriched));
    } catch (e) {
      console.error('Failed to fetch restaurants:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <RestaurantContext.Provider value={{ restaurants, loading }}>
      {children}
    </RestaurantContext.Provider>
  );
};
