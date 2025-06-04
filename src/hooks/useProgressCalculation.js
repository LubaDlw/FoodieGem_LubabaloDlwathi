export const useProgressCalculation = (gamePoints, level) => {
  const total = level * 1000;
  const progressPercentage = ((gamePoints / total) * 100).toFixed(0);
  const pointsToNext = total - gamePoints;

  return { progressPercentage, pointsToNext, total };
};