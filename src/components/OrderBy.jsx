import React, { useState } from 'react';
import '../components.css';

const OrderBy = ({ onSortChange, currentSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating-desc', label: 'Highest Rated' },
    { value: 'alphabetical', label: 'Alphabetical' }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSortChange = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  // Get the label of the currently selected sort option
  const getCurrentSortLabel = () => {
    const option = sortOptions.find(option => option.value === currentSort);
    return option ? option.label : 'Default';
  };

  return (
    <div className="order-by-container">
      <button 
        className="dropdown-trigger"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        {getCurrentSortLabel()}
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className="dropdown-content">
          {sortOptions.map(option => (
            <button
              key={option.value}
              className={`sort-option ${currentSort === option.value ? 'active' : ''}`}
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderBy;