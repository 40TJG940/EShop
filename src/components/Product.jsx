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
  
  // Determine availability status
  const availabilityStatus = stock > 0 ? "In Stock" : "Out of Stock";

  return (
    <article className="product-card">
      <div className="product-image">
        <img src={thumbnail} alt={title} />
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <div className="product-category">{category}</div>
        <div className="product-brand">{brand}</div>
        
        <div className="product-rating">
          <Ratings rating={rating} />
          <span className="reviews-count">({reviews ? reviews.length : 0} reviews)</span>
        </div>
        
        <p className="product-description">{description}</p>
        
        <div className="product-pricing">
          <div className="original-price">{price}€</div>
          <div className="discounted-price">{discountedPrice}€</div>
        </div>
        
        <div className="product-footer">
          <button className="buy-button">Buy Now</button>
          <span className={`availability ${stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {availabilityStatus}
          </span>
        </div>
      </div>
    </article>
  );
};

export default Product;