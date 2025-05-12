import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HeaderWithAuth from "./components/HeaderWithAuth";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ShopPage from "./components/ShopPage";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function AppWithAuth() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          <HeaderWithAuth />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop/:category" element={<ShopPage />} />
            <Route path="/login" element={<Login />} />
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
    </AuthProvider>
  );
}

export default AppWithAuth;