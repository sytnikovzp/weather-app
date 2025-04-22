import api from '../api';

const getUserProfile = async () => {
  const response = await api.get('/profile');
  return response;
};

export { getUserProfile };
