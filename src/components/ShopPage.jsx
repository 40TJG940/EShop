import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Products from './Products';
import BrandsAvailable from './BrandsAvailable';
import OrderBy from './OrderBy';
import '../App.css';

const ShopPage = () => {
  const { category } = useParams();
  
  // State hooks
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch products based on category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/category/${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
        
        // Extract unique brands
        const uniqueBrands = [...new Set(data.products.map(product => product.brand))];
        setBrands(uniqueBrands);
        setSelectedBrands(uniqueBrands); // Initially all brands are selected
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Unable to load products. Please try again later.');
        
        // Load local JSON data as fallback
        try {
          let localData;
          if (category === 'sunglasses') {
            // For demo: fetch the local file
            const localResponse = await fetch('/src/data/sunglasses.json');
            if (localResponse.ok) {
              localData = await localResponse.json();
            }
          } else {
            // Similar approach for mens-shirts
            const localResponse = await fetch('/src/data/mens-shirts.json');
            if (localResponse.ok) {
              localData = await localResponse.json();
            }
          }
          
          if (localData && localData.products) {
            setProducts(localData.products);
            
            // Extract unique brands from local data
            const uniqueBrands = [...new Set(localData.products.map(product => product.brand))];
            setBrands(uniqueBrands);
            setSelectedBrands(uniqueBrands);
          }
        } catch (localErr) {
          console.error('Error loading local data:', localErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // Handle brand selection
  const handleBrandSelection = (brand, isChecked) => {
    if (isChecked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  // Filter products by selected brands
  const filteredProducts = products.filter(product => 
    selectedBrands.includes(product.brand)
  );

  // Sort products based on criteria
  let sortedProducts = [...filteredProducts];
  switch (sortCriteria) {
    case 'price-asc':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'alphabetical':
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      // Keep original order
      break;
  }

  return (
    <div className="main-container">
      <div className="sidebar">
        <h2 className="sidebar-title">Filtres</h2>
        
        <div className="filter-section">
          <BrandsAvailable 
            brands={brands} 
            selectedBrands={selectedBrands}
            onBrandSelection={handleBrandSelection}
            category={category}
          />
        </div>
        
        <div className="filter-section">
          <OrderBy 
            onSortChange={setSortCriteria} 
            currentSort={sortCriteria} 
          />
        </div>
      </div>
      
      <div className="main-content">
        {loading ? (
          <div className="loading">Chargement des produits...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <Products products={sortedProducts} />
        )}
      </div>
    </div>
  );
};

export default ShopPage;