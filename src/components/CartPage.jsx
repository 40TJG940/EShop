import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '../cart-components.css';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useContext(CartContext);
  const { userAuthenticated } = useContext(AuthContext);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const cartTotal = getCartTotal();
  const shippingCost = cartTotal > 50 ? 0 : 5.99;
  const totalWithShipping = cartTotal + shippingCost;

  // Gérer la mise à jour de la quantité
  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity, 10));
  };

  // Gérer la suppression d'un article
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  // Gérer le processus de commande
  const handleCheckout = () => {
    if (cart.length === 0) return;

    if (!userAuthenticated) {
      // Rediriger vers la page de connexion si non connecté
      navigate('/login?redirect=cart');
      return;
    }

    setCheckoutLoading(true);

    // Simuler le processus de commande
    setTimeout(() => {
      setCheckoutLoading(false);
      setSuccessMessage('Votre commande a été passée avec succès !');
      clearCart();

      // Rediriger vers la page d'accueil après un délai
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  // Si le panier est vide
  if (cart.length === 0 && !successMessage) {
    return (
      <div className="cart-page-container">
        <div className="cart-empty">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h2>Votre panier est vide</h2>
          <p>Parcourez notre catalogue et ajoutez des produits à votre panier.</p>
          <Link to="/shop/sunglasses" className="continue-shopping-btn">
            Parcourir les produits
          </Link>
        </div>
      </div>
    );
  }

  // Si la commande a été passée avec succès
  if (successMessage) {
    return (
      <div className="cart-page-container">
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h2>{successMessage}</h2>
          <p>Vous allez être redirigé vers la page d'accueil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h1 className="cart-title">Votre panier</h1>
      
      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-header">
            <div className="cart-header-product">Produit</div>
            <div className="cart-header-price">Prix</div>
            <div className="cart-header-quantity">Quantité</div>
            <div className="cart-header-total">Total</div>
            <div className="cart-header-actions"></div>
          </div>
          
          {cart.map(item => {
            const itemPrice = item.discountPercentage 
              ? (item.price * (1 - item.discountPercentage / 100)).toFixed(2)
              : item.price.toFixed(2);
            
            const itemTotal = (itemPrice * item.quantity).toFixed(2);
            
            return (
              <div key={item.id} className="cart-item">
                <div className="cart-item-product">
                  <div className="cart-item-image">
                    <img src={item.thumbnail} alt={item.title} />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-title">{item.title}</div>
                    <div className="cart-item-brand">{item.brand}</div>
                  </div>
                </div>
                
                <div className="cart-item-price">
                  {itemPrice}€
                  {item.discountPercentage > 0 && (
                    <span className="original-price">{item.price.toFixed(2)}€</span>
                  )}
                </div>
                
                <div className="cart-item-quantity">
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={item.stock || 99}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  />
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    disabled={item.quantity >= (item.stock || 99)}
                  >
                    +
                  </button>
                </div>
                
                <div className="cart-item-total">
                  {itemTotal}€
                </div>
                
                <div className="cart-item-actions">
                  <button 
                    className="remove-item-btn"
                    onClick={() => handleRemoveItem(item.id)}
                    title="Supprimer cet article"
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          })}
          
          <div className="cart-actions">
            <Link to="/shop/sunglasses" className="continue-shopping-btn">
              Continuer les achats
            </Link>
            <button 
              className="clear-cart-btn"
              onClick={() => clearCart()}
            >
              Vider le panier
            </button>
          </div>
        </div>
        
        <div className="cart-summary">
          <h2>Récapitulatif</h2>
          
          <div className="summary-row">
            <span>Sous-total:</span>
            <span>{cartTotal.toFixed(2)}€</span>
          </div>
          
          <div className="summary-row">
            <span>Frais de livraison:</span>
            <span>
              {shippingCost === 0 ? (
                <span className="free-shipping">Gratuit</span>
              ) : (
                `${shippingCost.toFixed(2)}€`
              )}
            </span>
          </div>
          
          {shippingCost > 0 && (
            <div className="shipping-note">
              Plus que {(50 - cartTotal).toFixed(2)}€ pour la livraison gratuite!
            </div>
          )}
          
          <div className="summary-total">
            <span>Total:</span>
            <span>{totalWithShipping.toFixed(2)}€</span>
          </div>
          
          <button 
            className={`checkout-btn ${checkoutLoading ? 'loading' : ''}`}
            onClick={handleCheckout}
            disabled={checkoutLoading}
          >
            {checkoutLoading ? 'Traitement...' : 'Passer la commande'}
          </button>
          
          {!userAuthenticated && (
            <div className="login-reminder">
              <p>Veuillez vous <Link to="/login?redirect=cart">connecter</Link> pour finaliser votre commande.</p>
            </div>
          )}
          
          <div className="payment-methods">
            <div className="payment-method-icons">
              <span>💳</span>
              <span>🔒</span>
              <span>🌐</span>
            </div>
            <p>Paiement 100% sécurisé</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;