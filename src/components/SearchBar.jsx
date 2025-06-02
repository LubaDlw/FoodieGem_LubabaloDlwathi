import React from 'react';
import { Search } from 'lucide-react';
import '../styles/SearchBar.css';

const SearchBar = ({ placeholder, onSearch }) => {
  return (
    <div className="search-container">
      <div className="search-icon">
        <Search size={18} />
      </div>
      <input 
        type="text" 
        placeholder={placeholder} 
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;