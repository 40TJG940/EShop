import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Products from './components/Products';
import BrandsAvailable from './components/BrandsAvailable';
import OrderBy from './components/OrderBy';
import Footer from './components/Footer';
import './App.css';

function App() {
  // State hooks
  const [category, setCategory] = useState('sunglasses');
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
            localData = await import('./data/sunglasses.json');
          } else {
            localData = await import('./data/mens-shirts.json');
          }
          setProducts(localData.products);
          
          // Extract unique brands from local data
          const uniqueBrands = [...new Set(localData.products.map(product => product.brand))];
          setBrands(uniqueBrands);
          setSelectedBrands(uniqueBrands);
        } catch (localErr) {
          console.error('Error loading local data:', localErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSortCriteria('default'); // Reset sort when changing category
  };

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
    <div className="container">
      <Header category={category} onCategoryChange={handleCategoryChange} />
      
      <div className="filters-container">
        <BrandsAvailable 
          brands={brands} 
          selectedBrands={selectedBrands}
          onBrandSelection={handleBrandSelection}
          category={category}
        />
        <OrderBy onSortChange={setSortCriteria} currentSort={sortCriteria} />
      </div>
      
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <Products products={sortedProducts} />
      )}
      
      <Footer />
    </div>
  );
}

export default App;