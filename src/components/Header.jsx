import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "../components.css";

const Header = () => {
  const { category } = useParams() || { category: null };
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Determine if we're in the shop and which category is active
  const isShop = location.pathname.includes('/shop/');
  const currentCategory = category || 'sunglasses';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Header style changes on scroll
  const headerStyle = {
    padding: scrolled ? '0.75rem 2rem' : '1rem 2rem',
    boxShadow: scrolled ? '0 5px 15px rgba(0, 0, 0, 0.1)' : 'none',
    transition: 'all 0.3s ease'
  };

  return (
    <header className="header" style={headerStyle}>
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