import React from 'react';

const TabNavigation = ({ activeTab, onTabChange, tabs = ['Overview', 'Menu', 'Location'] }) => {
  return (
    <div className="tab-navigation">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;