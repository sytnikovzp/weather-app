import api from '../api';

const getUserProfile = async () => {
  const { data } = await api.get('/profile');
  return data;
};

const updateUserProfile = async (userData) => {
  const { data } = await api.patch('/profile', userData);
  return data;
};

const deleteUserProfile = async () => {
  const { data } = await api.delete(`/profile`);
  return data;
};

export default {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
