import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8886', 
});

// Fetch user profile by user ID
export const getUser Profile = async (userId) => {
  try {
    const response = await api.get(`/api/entities/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data', error);
    throw error;
  }
};

// Add user address
export const addUser Address = async (userId, address) => {
  try {
    const response = await api.post(`/api/entities/profile/${userId}/address`, { address });
    return response.data;
  } catch (error) {
    console.error('Error adding address', error);
    throw error;
  }
};

// Fetch all entities
export const getEntities = async () => {
  try {
    const response = await api.get('/api/');
    return response.data;
  } catch (error) {
    console.error('Error fetching entities', error);
    throw error;
  }
};


export const addEntity = async (entity) => {
  try {
    const response = await api.post('/api/create', entity); 
    return response.data;
  } catch (error) {
    console.error('Error adding entity', error);
    throw error;
  }
};

export default api;