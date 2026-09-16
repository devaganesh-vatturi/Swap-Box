import axiosInstance from './axiosConfig';

export const userService = {



  getUserContact: async (userId) => {
    const response = await axiosInstance.get(`/users/${userId}/contact`);
    return response.data;
  },
};