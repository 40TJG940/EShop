import React from 'react';
import '../components.css';

const BrandsAvailable = ({ brands, selectedBrands, onBrandSelection, category }) => {
  const handleBrandChange = (brand, isChecked) => {
    onBrandSelection(brand, isChecked);
  };

  return (
    <div className="brands-filter">
      <h3 className="brands-title">Marques disponibles</h3>
      <div className="brand-list">
        {brands.map(brand => {
          // Count products for this brand in this category
          const count = 1; // Simplified for this example
          
          return (
            <label key={brand} className="brand-checkbox">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={(e) => handleBrandChange(brand, e.target.checked)}
              />
              <span className="brand-name">
                {brand} ({count})
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default BrandsAvailable;