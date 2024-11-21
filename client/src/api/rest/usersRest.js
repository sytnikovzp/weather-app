import api from '../interceptor';

const fetchUserProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

export default { fetchUserProfile };
