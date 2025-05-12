import React, { createContext, useState, useEffect } from 'react';
import { getToken, removeToken } from '../actions/tokenActions';
import { getUser } from '../actions/getUser';

const initialContext = {
  userAuthenticated: null,
  setUserAuthenticated: () => {},
  isLoading: true,
  logout: () => {}
};

export const AuthContext = createContext(initialContext);

export const AuthProvider = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getToken();
        if (token) {
          const userData = await getUser(token);
          if (userData) {
            setUserAuthenticated({ token, ...userData });
          }
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        removeToken();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

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
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};