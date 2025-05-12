import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useLocation, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../components.css";

const HeaderWithAuth = () => {
  const { category } = useParams() || { category: null };
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { userAuthenticated, logout } = useContext(AuthContext);
  
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

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header" style={headerStyle}>
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>Eshop</h1>
        </Link>
      </div>
      
      <nav className="main-nav">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop/sunglasses" className={({ isActive }) => isActive ? "active" : ""}>
              Boutique
            </NavLink>
          </li>
          {userAuthenticated && (
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
                Tableau de bord
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      
      <div className="category-buttons">
        {isShop && (
          <>
            <Link 
              to="/shop/sunglasses" 
              className={`category-btn ${isShop && currentCategory === 'sunglasses' ? 'active' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              Lunettes de soleil
            </Link>
            <Link 
              to="/shop/mens-shirts" 
              className={`category-btn ${isShop && currentCategory === 'mens-shirts' ? 'active' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              Chemises pour hommes
            </Link>
          </>
        )}
        
        {userAuthenticated ? (
          <div className="auth-section">
            <div className="user-info">
              <span className="user-greeting">Bonjour, {userAuthenticated.firstName}</span>
              <button onClick={handleLogout} className="auth-button logout">
                Se déconnecter
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="auth-button login">
            Se connecter
          </Link>
        )}
      </div>
    </header>
  );
};

export default HeaderWithAuth;