import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../auth-components.css';

const Dashboard = () => {
  const { userAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Chargement de vos informations...</div>
      </div>
    );
  }

  if (!userAuthenticated) {
    return null; // This should never display as ProtectedRoute will redirect
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Tableau de bord</h2>
        <p>Bienvenue, {userAuthenticated.firstName} {userAuthenticated.lastName}!</p>
      </div>
      
      <div className="dashboard-content">
        <div className="user-info-card">
          <div className="user-avatar">
            <img src={userAuthenticated.image} alt="Avatar de l'utilisateur" />
          </div>
          
          <div className="user-details">
            <h3>Informations personnelles</h3>
            
            <div className="info-row">
              <span className="info-label">Nom:</span>
              <span className="info-value">{userAuthenticated.firstName} {userAuthenticated.lastName}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{userAuthenticated.email}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Téléphone:</span>
              <span className="info-value">{userAuthenticated.phone || 'Non renseigné'}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Genre:</span>
              <span className="info-value">{userAuthenticated.gender || 'Non renseigné'}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Adresse:</span>
              <span className="info-value">
                {userAuthenticated.address?.address || 'Non renseignée'}, 
                {userAuthenticated.address?.city || ''}, 
                {userAuthenticated.address?.state || ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;