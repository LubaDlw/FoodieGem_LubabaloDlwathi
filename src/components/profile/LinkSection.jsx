import React from 'react';
import { ChevronRight, BookOpen } from 'lucide-react';

const LinkItem = ({ item, onNavigate }) => (
  <button
    className="link-item"
    onClick={() => onNavigate(item.path)}
  >
    <div className="link-content">
      <item.icon size={20} className="link-icon" />
      <span>{item.label}</span>
    </div>
    <ChevronRight size={16} className="link-arrow" />
  </button>
);

const LinkSection = ({ onNavigate }) => {
  const documentationSection = {
    title: "Help & Support",
    items: [
      {
        icon: BookOpen,
        label: "Documentation",
        path: "/documentation"
      }
    ]
  };

  return (
    <div className="links-section">
      <h3 className="section-title">{documentationSection.title}</h3>
      <div className="links-container">
        {documentationSection.items.map((item, index) => (
          <LinkItem
            key={index}
            item={item}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
};

export default LinkSection;