import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { setToken, setUserData } from '../actions/tokenActions';
import '../auth-components.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { setUserAuthenticated, userAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extraire le paramètre de redirection s'il existe
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirect') || '/dashboard';
  
  // Rediriger si déjà connecté
  useEffect(() => {
    if (userAuthenticated) {
      navigate(redirectTo);
    }
  }, [userAuthenticated, navigate, redirectTo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // L'URL peut être /auth/login ou /user/login selon la documentation
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60 // 60 minutes d'expiration
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }
      
      // Extraire les données utilisateur de la réponse
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
      
      // Stockage du token dans le localStorage
      setToken(data.token);
      
      // Stockage des données utilisateur pour un chargement plus rapide
      setUserData(userData);
      
      // Mise à jour du contexte
      setUserAuthenticated({ token: data.token, ...userData });
      
      console.log('Connexion réussie, redirection vers:', redirectTo);
      
      // Redirection
      navigate(redirectTo);
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
              <li>Username: kminchelle</li>
              <li>Password: 0lelplR</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;   