import React, { useState } from 'react';
import Ratings from './Ratings';
import '../components.css';

const Product = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const { 
    title, 
    category, 
    brand, 
    rating, 
    thumbnail, 
    description, 
    price, 
    discountPercentage,
    stock,
    reviews
  } = product;

  // Calculate discounted price
  const discountedPrice = (price - (price * discountPercentage / 100)).toFixed(2);
  const discount = discountPercentage > 0 ? `-${Math.round(discountPercentage)}%` : null;

  // Animate description on hover
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  // Determine availability status with a more engaging label
  const availabilityStatus = stock > 10 
    ? "En stock ✓" 
    : stock > 0 
      ? `Derniers exemplaires! (${stock})` 
      : "Rupture de stock ✗";
  
  // Dynamic styles for availability
  const availabilityStyle = {
    color: stock > 10 ? '#10b981' : stock > 0 ? '#f59e0b' : '#ef4444',
    fontWeight: stock <= 10 ? 'bold' : 'normal',
    animation: stock <= 10 && stock > 0 ? 'pulse 2s infinite' : 'none'
  };

  return (
    <article 
      className="product-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {discount && <div className="discount-badge">{discount}</div>}
      
      <div className="product-image">
        <img src={thumbnail || "https://placehold.co/400x300?text=No+Image"} alt={title} />
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <div className="product-category">{category}</div>
        
        <p className="product-description" style={{
          maxHeight: isHovered ? '100px' : '60px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease'
        }}>
          {description}
        </p>
        
        <div className="product-rating">
          <Ratings rating={rating} />
          <span className="rating-value">★{rating.toFixed(1)}/5</span>
        </div>
        
        <div className="product-pricing">
          <div className="discounted-price">{discountedPrice}€</div>
          {discountPercentage > 0 && (
            <div className="original-price">{price.toFixed(2)}€</div>
          )}
        </div>
        
        <div className="product-footer">
          <button className="buy-button">
            Acheter
          </button>
          <span className="availability" style={availabilityStyle}>
            {availabilityStatus}
          </span>
        </div>
      </div>
    </article>
  );
};

export default Product;