import React, { createContext, useState, useEffect } from 'react';
import { getToken, removeToken, getUserData, setUserData } from '../actions/tokenActions';
import { getUser } from '../actions/getUser';

const initialContext = {
  userAuthenticated: null,
  setUserAuthenticated: () => {},
  isLoading: true,
  logout: () => {},
  checkAuth: () => Promise.resolve()
};

export const AuthContext = createContext(initialContext);

export const AuthProvider = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour vérifier l'authentification
  const checkAuth = async () => {
    setIsLoading(true);
    try {
      console.log("Vérification de l'authentification...");
      
      // Vérifier d'abord si nous avons des données utilisateur en cache
      const cachedUserData = getUserData();
      const token = getToken();
      
      if (!token) {
        console.log("Aucun token trouvé, déconnexion");
        setUserAuthenticated(null);
        setIsLoading(false);
        return false;
      }
      
      // Si nous avons des données en cache, les utiliser immédiatement
      if (cachedUserData) {
        console.log("Données utilisateur trouvées en cache");
        setUserAuthenticated({ ...cachedUserData, token });
        
        // Rafraîchir en arrière-plan
        refreshUserData(token).catch(error => {
          console.warn("Erreur lors du rafraîchissement des données:", error);
        });
        
        setIsLoading(false);
        return true;
      }
      
      // Si pas de cache, récupérer les données depuis l'API
      console.log("Récupération des données utilisateur depuis l'API...");
      const userData = await getUser(token);
      
      if (userData) {
        console.log("Données utilisateur récupérées avec succès");
        // Stocker les données dans le contexte et le cache
        setUserAuthenticated({ token, ...userData });
        setUserData(userData);
        setIsLoading(false);
        return true;
      } else {
        console.log("Échec de la récupération des données utilisateur");
        removeToken();
        setUserAuthenticated(null);
        setIsLoading(false);
        return false;
      }
      
    } catch (error) {
      console.error("Erreur lors de la vérification de l'authentification:", error);
      removeToken();
      setUserAuthenticated(null);
      setIsLoading(false);
      return false;
    }
  };

  // Rafraîchir les données utilisateur en arrière-plan
  const refreshUserData = async (token) => {
    try {
      const userData = await getUser(token);
      if (userData) {
        setUserAuthenticated(prevState => ({ ...prevState, ...userData }));
        setUserData(userData);
      }
    } catch (error) {
      console.error("Erreur lors du rafraîchissement des données:", error);
    }
  };

  // Vérifier l'authentification au chargement de l'application
  useEffect(() => {
    checkAuth();
    
    // Ajouter un écouteur d'événement pour vérifier l'authentification 
    // lorsque la fenêtre devient visible (après avoir été en arrière-plan)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAuth();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Fonction de déconnexion
  const logout = () => {
    setUserAuthenticated(null);
    removeToken();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        userAuthenticated, 
        setUserAuthenticated, 
        isLoading,
        logout,
        checkAuth 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};