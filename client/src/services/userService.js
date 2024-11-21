import api from '../api/interceptor';

const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

const getUserById = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

const updateUser = async (userData) => {
  const response = await api.put('/users', userData);
  return response.data;
};

const deleteUserById = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

export default {
  getAllUsers,
  getUserProfile,
  getUserById,
  updateUser,
  deleteUserById,
};
