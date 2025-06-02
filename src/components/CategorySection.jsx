import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../styles/CategorySection.css';
import CategoryCard from './CategoryCard';

const CategorySection = ({ categories, onViewAll, onCategoryClick }) => {
  return (
    <section className="category-section">
      <div className="section-header">
        <h2>Categories</h2>
        <button onClick={onViewAll} className="view-all">
          View All <ArrowRight size={16} />
        </button>
      </div>

      <div className="categories-grid">
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            name={category.name}
            image={category.image}
            onClick={() => onCategoryClick(category.name)}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;