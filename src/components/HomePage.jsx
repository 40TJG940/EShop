import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  // Catégories disponibles
  const categories = [
    {
      id: 'sunglasses',
      name: 'Lunettes de soleil',
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      description: 'Découvrez notre collection de lunettes de soleil tendance pour tous les styles.'
    },
    {
      id: 'mens-shirts',
      name: 'Chemises pour hommes',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      description: 'Explorez notre sélection de chemises pour hommes alliant confort et élégance.'
    }
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Bienvenue sur Eshop</h1>
          <p>Découvrez notre sélection de produits de qualité</p>
          <Link to="/shop/sunglasses" className="cta-button">
            Commencer vos achats
          </Link>
        </div>
      </div>

      <div className="categories-section">
        <h2>Nos catégories</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <Link 
              to={`/shop/${category.id}`} 
              className="category-card" 
              key={category.id}
            >
              <div className="category-image">
                <img src={category.image} alt={category.name} />
              </div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="features-section">
        <div className="feature">
          <div className="feature-icon">🚚</div>
          <h3>Livraison rapide</h3>
          <p>Livraison sous 48h pour toutes vos commandes</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💯</div>
          <h3>Qualité garantie</h3>
          <p>Tous nos produits sont sélectionnés avec soin</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🔄</div>
          <h3>Retours faciles</h3>
          <p>30 jours pour changer d'avis</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;