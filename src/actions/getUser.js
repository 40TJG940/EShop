/**
 * Fetch user data from the API using the authentication token
 * @param {string} token - The authentication token
 * @returns {Promise<Object>} The user data
 */
export const getUser = async (token) => {
  try {
    // Nous pouvons utiliser l'endpoint auth/me ou extraire les données du JWT
    const response = await fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    
    // Si l'API ne fonctionne pas comme prévu, nous pouvons parser le token JWT
    // pour obtenir les données utilisateur
    try {
      // Extraction des données du token JWT
      // Le token est composé de 3 parties séparées par des points
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        // La deuxième partie contient les données utilisateur (payload)
        const payload = JSON.parse(atob(tokenParts[1]));
        return {
          id: payload.id,
          username: payload.username,
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
          // Autres données si disponibles
          image: payload.image || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
          gender: payload.gender || 'unknown',
        };
      }
    } catch (jwtError) {
      console.error('Error parsing JWT token:', jwtError);
    }
    
    throw error;
  }
};