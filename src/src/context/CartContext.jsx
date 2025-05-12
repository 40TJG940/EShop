import React, { createContext, useState, useEffect } from 'react';

const initialContext = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getItemsCount: () => 0,
};

export const CartContext = createContext(initialContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  // Charger le panier depuis le localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('eshop_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
        localStorage.removeItem('eshop_cart');
      }
    }
  }, []);
  
  // Enregistrer le panier dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('eshop_cart', JSON.stringify(cart));
  }, [cart]);
  
  // Ajouter un produit au panier
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      // Vérifier si le produit est déjà dans le panier
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Produit déjà dans le panier - mettre à jour la quantité
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity
        };
        return updatedCart;
      } else {
        // Nouveau produit - ajouter au panier
        return [...prevCart, { ...product, quantity }];
      }
    });
  };
  
  // Supprimer un produit du panier
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  // Mettre à jour la quantité d'un produit
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };
  
  // Vider complètement le panier
  const clearCart = () => {
    setCart([]);
  };
  
  // Calculer le total du panier
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      // Utiliser le prix après remise si disponible
      const itemPrice = item.discountPercentage 
        ? item.price * (1 - item.discountPercentage / 100) 
        : item.price;
      
      return total + (itemPrice * item.quantity);
    }, 0);
  };
  
  // Calculer le nombre total d'articles
  const getItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };
  
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};