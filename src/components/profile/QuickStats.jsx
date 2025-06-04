import React from 'react';
import { Gem, Star, Trophy } from 'lucide-react';

const StatItem = ({ icon: Icon, number, label }) => (
  <div className="stat-item">
    <Icon size={24} />
    <span className="stat-number">{number}</span>
    <span className="stat-label">{label}</span>
  </div>
);

const QuickStats = ({ submittedGems, gamePoints, badgeCount }) => {
  const stats = [
    { icon: Gem, number: submittedGems, label: 'Gems Submitted' },
    { icon: Star, number: gamePoints, label: 'Points' },
    { icon: Trophy, number: badgeCount, label: 'Badges' }
  ];

  return (
    <div className="quick-stats">
      {stats.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
    </div>
  );
};

export default QuickStats;