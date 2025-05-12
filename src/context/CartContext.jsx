import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

// Créer le contexte avec des valeurs par défaut
export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getItemsCount: () => 0,
});

// Provider du contexte de panier
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { userAuthenticated } = useContext(AuthContext);
  
  // Clé de stockage pour le panier qui dépend de l'utilisateur connecté
  const getCartStorageKey = () => {
    if (userAuthenticated) {
      return `eshop_cart_${userAuthenticated.id}`;
    }
    return 'eshop_cart_guest';
  };
  
  // Charger le panier approprié lorsque l'état d'authentification change
  useEffect(() => {
    const cartKey = getCartStorageKey();
    console.log(`Chargement du panier pour la clé: ${cartKey}`);
    
    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error(`Erreur lors du chargement du panier (${cartKey}):`, error);
        localStorage.removeItem(cartKey);
      }
    } else {
      // Si pas de panier sauvegardé pour cet utilisateur, réinitialiser
      setCart([]);
    }
  }, [userAuthenticated]); // Recharger quand l'utilisateur change
  
  // Enregistrer le panier dans le localStorage à chaque modification
  useEffect(() => {
    const cartKey = getCartStorageKey();
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, userAuthenticated]);
  
  // Fusionner le panier invité avec le panier utilisateur lors de la connexion
  useEffect(() => {
    // Si un utilisateur vient de se connecter et qu'il y avait un panier invité
    if (userAuthenticated) {
      const guestCartKey = 'eshop_cart_guest';
      const guestCart = localStorage.getItem(guestCartKey);
      
      if (guestCart) {
        try {
          const parsedGuestCart = JSON.parse(guestCart);
          
          // S'il y a des éléments dans le panier invité
          if (parsedGuestCart.length > 0) {
            console.log("Fusion du panier invité avec le panier utilisateur");
            
            // Ajouter les éléments du panier invité au panier utilisateur
            setCart(prevCart => {
              // Créer un nouvel array pour les éléments fusionnés
              const mergedCart = [...prevCart];
              
              // Parcourir les éléments du panier invité
              parsedGuestCart.forEach(guestItem => {
                // Vérifier si le produit existe déjà dans le panier utilisateur
                const existingItemIndex = mergedCart.findIndex(
                  item => item.id === guestItem.id
                );
                
                if (existingItemIndex !== -1) {
                  // Si le produit existe, additionner les quantités
                  mergedCart[existingItemIndex] = {
                    ...mergedCart[existingItemIndex],
                    quantity: mergedCart[existingItemIndex].quantity + guestItem.quantity
                  };
                } else {
                  // Sinon, ajouter le nouvel élément
                  mergedCart.push(guestItem);
                }
              });
              
              return mergedCart;
            });
            
            // Supprimer le panier invité
            localStorage.removeItem(guestCartKey);
          }
        } catch (error) {
          console.error("Erreur lors de la fusion des paniers:", error);
        }
      }
    }
  }, [userAuthenticated]); // Exécuter seulement lorsque l'état d'authentification change
  
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
  
  // Fournir les valeurs et fonctions du panier via le Provider
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