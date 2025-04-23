import React from 'react';
import Product from './Product';
import '../components.css';

const Products = ({ products }) => {
  if (products.length === 0) {
    return <div className="no-products">Aucun produit trouvé correspondant à vos critères</div>;
  }

  return (
    <div className="products-grid">
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;