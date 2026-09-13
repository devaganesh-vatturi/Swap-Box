import axiosInstance from './axiosConfig';

export const resourceService = {
 

   getMyItems: async () => {
    const response = await axiosInstance.get('/resources/my-things');
    return response.data;
  },
   getMySkills: async () => {
    const response = await axiosInstance.get('/resources/my-skills');
    return response.data;
  },
  

  getSearchSkills: async (filters = {}) => {
  const params = {};

  if (filters.district) {
    params.district = filters.district;
  }

  if (filters.mandal) {
    params.mandal = filters.mandal;
  }

  if (filters.category) {
    params.category = filters.category;
  }

  const response = await axiosInstance.get('/resources/skills', {
    params,
  });

  return response.data;
},


 getSearchThings: async (filters = {}) => {
  const params = {};

  if (filters.district) {
    params.district = filters.district;
  }

  if (filters.mandal) {
    params.mandal = filters.mandal;
  }

  if (filters.category) {
    params.category = filters.category;
  }

  const response = await axiosInstance.get('/resources/things', {
    params,
  });

  return response.data;
},
  
  createResource: async (resourceData) => {
    const response = await axiosInstance.post('/resources/create', resourceData);
    return response.data;
  },

  /**
   * Delete or archive a resource
   * @param {string|number} resourceId
   */
  deleteResource: async (resourceId) => {
    const response = await axiosInstance.delete(`/resources/${resourceId}`);
    return response.data;
  },
};