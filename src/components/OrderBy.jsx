import React, { useState } from 'react';
import '../components.css';

const OrderBy = ({ onSortChange, currentSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'default', label: 'Défaut' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'rating-desc', label: 'Meilleures notes' },
    { value: 'alphabetical', label: 'Ordre alphabétique' }
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
    return option ? option.label : 'Défaut';
  };

  return (
    <div className="order-by-container">
      <h3 className="order-by-title">Trier par</h3>
      <div className="order-by-dropdown">
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
              <div
                key={option.value}
                className={`sort-option ${currentSort === option.value ? 'active' : ''}`}
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBy;