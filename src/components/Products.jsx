import React, { useState, useEffect } from 'react';
import Product from './Product';
import '../components.css';

const Products = ({ products }) => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  
  // Load products with animation delay
  useEffect(() => {
    if (products.length === 0) {
      setDisplayedProducts([]);
      return;
    }
    
    // Show products progressively
    const initialCount = Math.min(6, products.length);
    setDisplayedProducts(products.slice(0, initialCount));
    
    // Load remaining products with delay
    if (products.length > initialCount) {
      setLoadingMore(true);
      const timer = setTimeout(() => {
        setDisplayedProducts(products);
        setLoadingMore(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="no-products">
        Aucun produit trouvé correspondant à vos critères
        <div className="empty-animation" style={{fontSize: '3rem', marginTop: '1rem'}}>🔍</div>
      </div>
    );
  }

  return (
    <>
      <div className="products-grid">
        {displayedProducts.map((product, index) => (
          <Product 
            key={product.id} 
            product={product} 
          />
        ))}
      </div>
      
      {loadingMore && (
        <div className="loading-more">
          Chargement de plus de produits...
        </div>
      )}
    </>
  );
};

export default Products;