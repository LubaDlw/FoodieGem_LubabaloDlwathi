import React from 'react';
import { Tag } from 'lucide-react';

const CategorySelector = ({ categories, selectedCategories, onToggle }) => (
  <div className="categories-grid">
    {categories.map((category) => (
      <button
        key={category.id}
        type="button"
        className={`category-tag ${
          selectedCategories.includes(category.name) ? 'selected' : ''
        }`}
        onClick={() => onToggle(category.name)}
      >
        <Tag size={16} />
        {category.name}
      </button>
    ))}
  </div>
);

export default CategorySelector;