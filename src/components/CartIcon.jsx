import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../cart-components.css';

const CartIcon = () => {
  const { cart, getItemsCount, getCartTotal } = useContext(CartContext);
  const [showPreview, setShowPreview] = useState(false);
  const [animate, setAnimate] = useState(false);
  const previewRef = useRef(null);
  const cartCount = getItemsCount();
  const cartTotal = getCartTotal();

  // Animer l'icône lorsque le panier change
  useEffect(() => {
    if (cartCount > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Fermer le prévisualisateur quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (previewRef.current && !previewRef.current.contains(event.target)) {
        setShowPreview(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fermer le prévisualisateur après un court délai
  useEffect(() => {
    if (showPreview) {
      const timer = setTimeout(() => {
        setShowPreview(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showPreview]);

  return (
    <div className="cart-icon-container" ref={previewRef}>
      <Link 
        to="/cart" 
        className={`cart-icon ${animate ? 'animate' : ''}`}
        onMouseEnter={() => cartCount > 0 && setShowPreview(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </Link>

      {showPreview && cartCount > 0 && (
        <div className="cart-preview">
          <h4>Votre panier ({cartCount} {cartCount > 1 ? 'articles' : 'article'})</h4>
          <div className="cart-preview-items">
            {cart.slice(0, 3).map(item => (
              <div key={item.id} className="cart-preview-item">
                <div className="cart-preview-item-image">
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className="cart-preview-item-details">
                  <div className="cart-preview-item-title">{item.title}</div>
                  <div className="cart-preview-item-price">
                    {item.quantity} x {(item.discountPercentage
                      ? item.price * (1 - item.discountPercentage / 100)
                      : item.price
                    ).toFixed(2)}€
                  </div>
                </div>
              </div>
            ))}
            {cart.length > 3 && (
              <div className="cart-preview-more">
                +{cart.length - 3} articles supplémentaires...
              </div>
            )}
          </div>
          <div className="cart-preview-total">
            <span>Total:</span>
            <span>{cartTotal.toFixed(2)}€</span>
          </div>
          <Link to="/cart" className="cart-preview-button">
            Voir le panier
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartIcon;