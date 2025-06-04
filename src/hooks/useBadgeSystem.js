import { useMemo } from 'react';
import { badgeDefinitions } from '../config/badgeConfig';

export const useBadgeSystem = ({ submittedGems, favoriteCount, userBadges }) => {
  return useMemo(() => {
    const earnedBadges = userBadges
      .map(badgeKey => badgeDefinitions[badgeKey])
      .filter(Boolean);

    const availableBadges = [];

    // Check for next available badges
    if (submittedGems === 0 && !userBadges.includes('firstGem')) {
      availableBadges.push({
        ...badgeDefinitions.firstGem,
        tooltip: 'Submit your first gem to unlock!'
      });
    }

    if (submittedGems < 5 && submittedGems > 0 && !userBadges.includes('fiveGems')) {
      availableBadges.push({
        ...badgeDefinitions.fiveGems,
        tooltip: `Submit ${5 - submittedGems} more gems to unlock!`
      });
    }

    if (favoriteCount < 5 && !userBadges.includes('foodie')) {
      availableBadges.push({
        ...badgeDefinitions.foodie,
        tooltip: `Add ${5 - favoriteCount} more favorites to unlock!`
      });
    }

    return { earnedBadges, availableBadges };
  }, [submittedGems, favoriteCount, userBadges]);
};