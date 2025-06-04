import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css';

const SearchBar = ({ 
  placeholder = "Search restaurants, cuisines...", 
  onSearch,
  showClearButton = true,
  autoFocus = false,
  disabled = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Call parent's onSearch function if provided
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to search results page with query
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <div className="search-icon">
        <Search size={18} />
      </div>
      <input 
        type="text" 
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        autoFocus={autoFocus}
        disabled={disabled}
        className={disabled ? 'disabled' : ''}
      />
      {showClearButton && searchTerm && (
        <button 
          type="button"
          className="clear-button"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </form>
  );
};

export default SearchBar;