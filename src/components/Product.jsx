import React, { useState, useContext } from 'react';
import Ratings from './Ratings';
import { CartContext } from '../context/CartContext';
import '../components.css';

const Product = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  
  const { addToCart } = useContext(CartContext);
  
  const { 
    id,
    title, 
    category, 
    brand, 
    rating, 
    thumbnail, 
    description, 
    price, 
    discountPercentage,
    stock
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

  // Fonction pour gérer l'ajout au panier
  const handleAddToCart = () => {
    if (stock <= 0) return; // Ne pas ajouter si rupture de stock
    
    setAddingToCart(true);
    
    // Simuler un délai pour montrer l'animation
    setTimeout(() => {
      addToCart(product, 1);
      setAddingToCart(false);
      
      // Afficher le message "Ajouté au panier"
      setShowAddedMessage(true);
      
      // Cacher le message après 2 secondes
      setTimeout(() => {
        setShowAddedMessage(false);
      }, 2000);
    }, 300);
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
          <button 
            className={`buy-button ${addingToCart ? 'adding' : ''} ${showAddedMessage ? 'added' : ''} ${stock <= 0 ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={stock <= 0 || addingToCart}
          >
            {showAddedMessage 
              ? '✓ Ajouté' 
              : addingToCart 
                ? 'Ajout...' 
                : stock <= 0 
                  ? 'Indisponible' 
                  : 'Ajouter au panier'}
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