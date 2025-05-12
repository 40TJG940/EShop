import React, { useState, useEffect } from 'react';
import '../components.css';

const BrandsAvailable = ({ brands, selectedBrands, onBrandSelection, category }) => {
  const [expandedView, setExpandedView] = useState(false);
  const [highlightedBrand, setHighlightedBrand] = useState(null);
  
  // Reset highlighted brand when category changes
  useEffect(() => {
    setHighlightedBrand(null);
  }, [category]);

  const handleBrandChange = (brand, isChecked) => {
    onBrandSelection(brand, isChecked);
    setHighlightedBrand(isChecked ? brand : null);
    
    // Animation effect
    if (isChecked) {
      setTimeout(() => {
        setHighlightedBrand(null);
      }, 1000);
    }
  };

  const toggleView = () => {
    setExpandedView(!expandedView);
  };

  // Count brands selected
  const selectedCount = selectedBrands.length;
  const totalCount = brands.length;

  return (
    <div className="brands-filter">
      <div className="brands-header">
        <h3 className="brands-title">Marques disponibles</h3>
        <button 
          className="view-toggle"
          onClick={toggleView}
          title={expandedView ? "Afficher moins" : "Afficher tout"}
          style={{
            background: 'none',
            border: 'none',
            color: '#3b82f6',
            fontSize: '0.9rem',
            cursor: 'pointer',
            padding: '0',
            fontWeight: '500'
          }}
        >
          {expandedView ? 'Réduire' : 'Tout voir'}
        </button>
      </div>
      
      <div className="selected-count" style={{
        fontSize: '0.85rem',
        color: '#666',
        marginBottom: '0.75rem'
      }}>
        {selectedCount} sur {totalCount} sélectionnées
      </div>
      
      <div className="brand-list" style={{
        maxHeight: expandedView ? '500px' : '200px',
        overflow: 'auto',
        transition: 'max-height 0.3s ease'
      }}>
        {brands.map((brand, index) => {
          // Count products for this brand in this category
          const count = 1; // Simplified for this example
          const isSelected = selectedBrands.includes(brand);
          const isHighlighted = highlightedBrand === brand;
          
          return (
            <label 
              key={brand} 
              className="brand-checkbox"
              style={{
                transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
                background: isHighlighted ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                animation: isHighlighted ? 'pulse 1s ease' : 'none',
                animationDelay: `${index * 0.05}s`
              }}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => handleBrandChange(brand, e.target.checked)}
              />
              <span className="brand-name">
                {brand} <span style={{color: '#999'}}>({count})</span>
              </span>
            </label>
          );
        })}
      </div>
      
      {!expandedView && brands.length > 5 && (
        <div 
          className="fade-bottom" 
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '50px',
            background: 'linear-gradient(to bottom, transparent, white)',
            pointerEvents: 'none'
          }}
        />
      )}
    </div>
  );
};

export default BrandsAvailable;