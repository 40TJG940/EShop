import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWithCart from './AppWithCart.jsx';
import './index.css';
import './components.css';
import './auth-components.css';
import './cart-components.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWithCart />
  </React.StrictMode>,
);