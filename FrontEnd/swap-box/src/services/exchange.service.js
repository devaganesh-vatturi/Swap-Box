import axiosInstance from './axiosConfig';

export const exchangeService = {

  requestSwap: async (requestedResourceId,creditOffered) => {
    const response = await axiosInstance.post('/exchange/create', { requestedResourceId,
      creditOffered} );
    return response.data;
  },
     getIncomingRequests: async (status) => {
    const response = await axiosInstance.get('/exchange/received', {
      params: {
        status
      },
    });

    return response.data;
  },

  // Update the status of a received request.
      updateProposalStatus: async (exchangeId, status) => {
        const response = await axiosInstance.patch(
          `/exchange/${exchangeId}/status`,
          {
            status,
          }
        );

        return response.data;
      },

 getSentRequests: async (status) => {
  const response = await axiosInstance.get('/exchange/sent', {
    params: {
      status: status,
    },
  });

  return response.data;
},


  approveSwap: async (exchangeId) => {
    const response = await axiosInstance.post(`/exchange/${exchangeId}/approve`);
    return response.data;
  },

  /**
   * Reject an incoming swap request
   * @param {string|number} exchangeId
   */
  rejectSwap: async (exchangeId) => {
    const response = await axiosInstance.post(`/exchange/${exchangeId}/reject`);
    return response.data;
  },

  /**
   * Get requests approved by the logged-in user ("Requests Which I Approved")
   */
  getApprovedByMe: async () => {
    const response = await axiosInstance.get('/exchange/approved-by-me');
    return response.data;
  },

  /**
   * Get swap requests made by the user that were approved by others ("Resources Which Other People Approved for Me")
   */
  getApprovedForMe: async () => {
    const response = await axiosInstance.get('/exchange/approved-for-me');
    return response.data;
  },
};