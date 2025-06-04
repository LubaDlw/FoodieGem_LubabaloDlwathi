import React from 'react';
import { Trophy, Award } from 'lucide-react';
import { useBadgeSystem } from '../../hooks/useBadgeSystem';
import { useProgressCalculation } from '../../hooks/useProgressCalculation';

const ProgressBar = ({ current, total, level }) => {
  const progressPercentage = ((current / total) * 100).toFixed(0);
  
  return (
    <div className="progress-container">
      <div className="progress-info">
        <span>Game Points</span>
        <span>{current}/{total}</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="progress-text">
        {total - current} points to next level
      </p>
    </div>
  );
};

const BadgeItem = ({ badge, isEarned, tooltip }) => (
  <div
    className={`badge-item ${isEarned ? 'earned' : 'locked'}`}
    style={isEarned ? { borderColor: badge.color } : {}}
    title={tooltip}
  >
    <span className="badge-icon">{badge.icon}</span>
    <span className="badge-name">{badge.name}</span>
  </div>
);

const GamificationSection = ({ user, favoriteCount }) => {
  const gamePoints = user?.gamePoints || 0;
  const level = user?.level || 1;
  const submittedGems = user?.submittedGems || 0;
  const userBadges = user?.badges || [];

  const { earnedBadges, availableBadges } = useBadgeSystem({
    submittedGems,
    favoriteCount,
    userBadges
  });

  const { progressPercentage, pointsToNext } = useProgressCalculation(gamePoints, level);

  return (
    <div className="gamification-section">
      <div className="section-header">
        <Trophy size={24} className="section-icon" />
        <div>
          <h3>Your Progress</h3>
          <p>Level {level} Explorer</p>
        </div>
      </div>

      <ProgressBar 
        current={gamePoints} 
        total={level * 1000} 
        level={level}
      />

      <div className="badges-container">
        <h4>Your Badges ({earnedBadges.length})</h4>
        <div className="badges-grid">
          {earnedBadges.map((badge, index) => (
            <BadgeItem
              key={index}
              badge={badge}
              isEarned={true}
              tooltip={badge.description}
            />
          ))}
          
          {availableBadges.map((badge, index) => (
            <BadgeItem
              key={`available-${index}`}
              badge={badge}
              isEarned={false}
              tooltip={badge.tooltip}
            />
          ))}
          
          {earnedBadges.length === 0 && availableBadges.length === 0 && (
            <div className="badge-item locked">
              <Award size={24} />
              <span className="badge-name">Start earning badges!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamificationSection;