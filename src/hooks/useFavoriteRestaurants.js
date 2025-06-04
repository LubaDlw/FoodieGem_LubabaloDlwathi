import { useMemo } from 'react';

export const useFavoriteRestaurants = (favoriteIds = [], restaurants = []) => {
  return useMemo(() => {
    return favoriteIds
      .map(favId => restaurants.find(r => r.id === favId))
      .filter(Boolean);
  }, [favoriteIds, restaurants]);
};