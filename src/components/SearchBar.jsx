import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import '../styles/SearchBar.css';

const SearchBar = ({
  placeholder = "Search restaurants, cuisines...",
  onSearch, // For real-time filtering
  onChange, // Alternative prop name for consistency
  value, // Controlled value from parent
  showClearButton = true,
  autoFocus = false,
  disabled = false
}) => {
  const [searchTerm, setSearchTerm] = useState(value || '');

  // Sync with parent value if provided (for controlled component)
  useEffect(() => {
    if (value !== undefined && value !== searchTerm) {
      setSearchTerm(value);
    }
  }, [value]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    
    // Call parent's search/onChange function if provided (for real-time filtering)
    if (onSearch) {
      onSearch(inputValue);
    } else if (onChange) {
      onChange(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Just prevent default form submission - no navigation
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    } else if (onChange) {
      onChange({ target: { value: '' } });
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