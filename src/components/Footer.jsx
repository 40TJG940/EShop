import React from 'react';
import '../components.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">Eshop</div>
        <nav className="footer-links">
          <a href="#legal">Mentions légales</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;