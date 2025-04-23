import React from 'react';
import Ratings from './Ratings';
import '../components.css';

const Product = ({ product }) => {
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
  
  return (
    <article className="product-card">
      {discount && <div className="discount-badge">{discount}</div>}
      
      <div className="product-image">
        <img src={thumbnail || "https://placehold.co/400x300?text=No+Image"} alt={title} />
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <div className="product-category">{category}</div>
        
        <p className="product-description">{description}</p>
        
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
      </div>
    </article>
  );
};

export default Product;