import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8886', 
});

export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/api/entities/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data', error);
    throw error;
  }
};

export const addUserAddress = async (userId, address) => {
  try {
    const response = await api.post(`/api/entities/profile/${userId}/address`, { address });
    return response.data;
  } catch (error) {
    console.error('Error adding address', error);
    throw error;
  }
};

export const getEntities = async () => {
  try {
    const response = await api.get('/api/entities');
    return response.data;
  } catch (error) {
    console.error('Error fetching entities', error);
    throw error;
  }
};

export default api;
