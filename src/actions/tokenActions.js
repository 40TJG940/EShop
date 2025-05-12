const TOKEN_KEY = 'eshop_auth_token';
const USER_DATA_KEY = 'eshop_user_data';

/**
 * Get token from localStorage and check if it's expired
 * @returns {string|null} The authentication token or null if not found or expired
 */
export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  
  if (!token) {
    return null;
  }
  
  // Vérifier si le token est expiré
  try {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      // Token malformé
      removeToken();
      return null;
    }
    
    const payload = JSON.parse(atob(tokenParts[1]));
    const expirationTime = payload.exp * 1000; // Convertir en millisecondes
    
    if (Date.now() >= expirationTime) {
      // Token expiré
      console.log("Token expiré, suppression...");
      removeToken();
      return null;
    }
    
    return token;
  } catch (error) {
    console.error("Erreur lors de la vérification du token:", error);
    removeToken();
    return null;
  }
};

/**
 * Save token to localStorage
 * @param {string} token - The authentication token to store
 */
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Save user data to localStorage for faster loading
 * @param {object} userData - The user data to store
 */
export const setUserData = (userData) => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
};

/**
 * Get user data from localStorage
 * @returns {object|null} The user data or null if not found
 */
export const getUserData = () => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Remove token and user data from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
};

/**
 * Parse a JWT token and extract the payload
 * @param {string} token - The JWT token to parse
 * @returns {object|null} The decoded payload or null if invalid
 */
export const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Erreur lors du décodage du token JWT:", error);
    return null;
  }
};