import React, { useState, useEffect } from 'react';
import '../components.css';

const OrderBy = ({ onSortChange, currentSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animateOptions, setAnimateOptions] = useState(false);

  const sortOptions = [
    { value: 'default', label: 'Défaut', icon: '🔄' },
    { value: 'price-asc', label: 'Prix croissant', icon: '💰↑' },
    { value: 'price-desc', label: 'Prix décroissant', icon: '💰↓' },
    { value: 'rating-desc', label: 'Meilleures notes', icon: '⭐' },
    { value: 'alphabetical', label: 'Ordre alphabétique', icon: '🔤' }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setAnimateOptions(true);
    }
  };

  const handleSortChange = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  // Animation effect when options appear
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setAnimateOptions(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Get the label of the currently selected sort option
  const getCurrentSortOption = () => {
    return sortOptions.find(option => option.value === currentSort) || sortOptions[0];
  };

  // Style for the animated options
  const getOptionStyle = (index) => ({
    animation: animateOptions ? 'scaleIn 0.2s forwards' : 'none',
    animationDelay: `${index * 0.05}s`,
    opacity: animateOptions ? 0 : 1
  });

  return (
    <div className="order-by-container">
      <h3 className="order-by-title">Trier par</h3>
      <div className="order-by-dropdown">
        <button 
          className="dropdown-trigger"
          onClick={toggleDropdown}
          aria-expanded={isOpen}
        >
          <span className="sort-icon">{getCurrentSortOption().icon}</span>
          <span>{getCurrentSortOption().label}</span>
          <span 
            className="dropdown-arrow"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}
          >
            ▼
          </span>
        </button>
        
        {isOpen && (
          <div className="dropdown-content">
            {sortOptions.map((option, index) => (
              <div
                key={option.value}
                className={`sort-option ${currentSort === option.value ? 'active' : ''}`}
                onClick={() => handleSortChange(option.value)}
                style={getOptionStyle(index)}
              >
                <span className="sort-icon">{option.icon}</span>
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