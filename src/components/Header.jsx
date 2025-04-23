import React from 'react';
import '../components.css';

const Header = ({ category, onCategoryChange }) => {
  return (
    <header className="header">
      <div className="logo">
        <h1>My Eshop</h1>
        <span className="current-category">| {category === 'mens-shirts' ? 'mens-shirts' : 'sunglasses'}</span>
      </div>
      
      <div className="category-buttons">
        <button 
          className={`category-btn ${category === 'sunglasses' ? 'active' : ''}`}
          onClick={() => onCategoryChange('sunglasses')}
        >
          Sunglasses
        </button>
        <button 
          className={`category-btn ${category === 'mens-shirts' ? 'active' : ''}`}
          onClick={() => onCategoryChange('mens-shirts')}
        >
          Men shirts
        </button>
      </div>
    </header>
  );
};

export default Header;