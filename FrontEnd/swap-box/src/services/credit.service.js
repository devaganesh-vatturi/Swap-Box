import axiosInstance from './axiosConfig';

export const creditService = {
  /**
   * Get current credit balance for the authenticated user
   */
  getBalance: async () => {
    const response = await axiosInstance.get('/credits/balance');
    return response.data; // Expects { balance: number }
  },

  /**
   * Add credits to user wallet
   * @param {number} amount - Number of credits to add
   */
  addCredits: async (amount,description) => {
    const response = await axiosInstance.post('/credits/add', {   amount,
      description });
    return response.data;
  },

  /**
   * Get audit log / transaction history of credits
   */
  getCreditHistory: async () => {
    const response = await axiosInstance.get('/credits/history');
    return response.data; // Expects array of transaction logs
  },
};