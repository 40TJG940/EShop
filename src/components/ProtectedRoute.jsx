import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { userAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    // Show loading spinner while checking authentication
    return (
      <div className="protected-route-loading">
        <div className="loading">Vérification de l'authentification...</div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!userAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, show the protected component
  return children;
};

export default ProtectedRoute;