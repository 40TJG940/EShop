import React, { useState } from 'react';
import '../components.css';

const BrandsAvailable = ({ brands, selectedBrands, onBrandSelection, category }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate product count for each brand
  const getProductCountByBrand = (brand) => {
    return selectedBrands.filter(selectedBrand => selectedBrand === brand).length;
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleBrandChange = (brand, isChecked) => {
    onBrandSelection(brand, isChecked);
  };

  return (
    <div className="brands-filter">
      <button 
        className="dropdown-trigger"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        Select your favorite brands...
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className="dropdown-content">
          {brands.map(brand => (
            <label key={brand} className="brand-checkbox">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={(e) => handleBrandChange(brand, e.target.checked)}
              />
              <span className="brand-name">
                {brand} ({getProductCountByBrand(brand)})
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandsAvailable;