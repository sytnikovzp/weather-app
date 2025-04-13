import api from '../api';

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

const updateUserProfile = async (userData) => {
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
  updateUserProfile,
  deleteUserById,
};
