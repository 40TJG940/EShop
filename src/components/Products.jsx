import React from 'react';
import Product from './Product';
import '../components.css';

const Products = ({ products }) => {
  if (products.length === 0) {
    return <div className="no-products">No products found matching your criteria</div>;
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