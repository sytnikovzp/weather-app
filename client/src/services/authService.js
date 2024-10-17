import api from '../api';

export const logout = async () => {
  try {
    await api.get('/auth/logout');
    localStorage.removeItem('accessToken');
  } catch (error) {
    console.log('Logout error:', error.message);
    throw new Error('Logout error');
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    console.log('Error fetching user profile:', error.message);
    throw new Error('Error fetching user profile');
  }
};
