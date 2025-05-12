import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { setToken } from '../actions/tokenActions';
import { getUser } from '../actions/getUser';
import '../auth-components.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { setUserAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // URL corrigée pour l'API DummyJSON
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60 // Optionnel, par défaut 60 minutes
        }),
      });
      
      const data = await response.json();
      console.log('Réponse API:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }
      
      // Store token in localStorage
      setToken(data.token);
      
      // Get user details - nous pouvons utiliser directement les données de l'API
      // puisqu'elles contiennent déjà les informations de l'utilisateur
      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image,
        phone: data.phone,
        address: data.address
      };
      
      // Update context
      setUserAuthenticated({ token: data.token, ...userData });
      
      console.log('Connexion réussie:', userData);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError(err.message || 'Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Entrez votre mot de passe"
            />
          </div>
          
          {error && <div className="login-error">{error}</div>}
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
          
          <div className="login-help">
            <p>Pour les tests, utilisez les identifiants:</p>
            <ul>
              <li>Username: emilys</li>
              <li>Password: emilyspass</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;