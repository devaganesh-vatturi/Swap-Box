import axiosInstance from './axiosConfig';

export const authService = {
  /**
   * Register a new user
   * @param {Object} userData - { username, email, password }
   */
  register: async (userData) => {
    const response = await axiosInstance.post('/users/register', userData);
    return response.data;
  },

  /**
   * Authenticate user and receive JWT token
   * @param {Object} credentials - { email, password }
   */
  login: async (credentials) => {
    const response = await axiosInstance.post('/users/login', credentials);
    return response.data; // Expects { token, user: { id, email, username } }
  },

  /**
   * Fetch current user profile details
   */
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/users/me');
    return response.data;
  },
};