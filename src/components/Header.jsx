import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "../components.css";

const Header = () => {
  const { category } = useParams() || { category: null };
  const location = useLocation();
  
  // Determine if we're in the shop and which category is active
  const isShop = location.pathname.includes('/shop/');
  const currentCategory = category || 'sunglasses';

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>Eshop</h1>
        </Link>
      </div>
      
      <div className="category-buttons">
        <Link 
          to="/shop/sunglasses" 
          className={`category-btn ${isShop && currentCategory === 'sunglasses' ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          Sunglasses
        </Link>
        <Link 
          to="/shop/mens-shirts" 
          className={`category-btn ${isShop && currentCategory === 'mens-shirts' ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          Mens Shirts
        </Link>
      </div>
    </header>
  );
};

export default Header;