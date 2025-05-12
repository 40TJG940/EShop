import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HeaderWithCart from "./components/HeaderWithCart";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ShopPage from "./components/ShopPage";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CartPage from "./components/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "./App.css";

function AppWithCart() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="app-wrapper">
            <HeaderWithCart />
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop/:category" element={<ShopPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<CartPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default AppWithCart;