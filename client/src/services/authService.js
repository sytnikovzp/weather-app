import { removeAccessToken, saveAccessToken } from '../utils/sharedFunctions';
import api from '../api';

const registration = async (fullName, email, password) => {
  const response = await api.post('/auth/registration', {
    fullName,
    email,
    password,
  });
  saveAccessToken(response.data.accessToken);
  return response;
};

const login = async (email, password) => {
  const response = await api.post('/auth/login', {
    email,
    password,
  });
  saveAccessToken(response.data.accessToken);
  return response;
};

const refreshAccessToken = async () => {
  const response = await api.get('/auth/refresh');
  return response;
};

const logout = async () => {
  const response = await api.get('/auth/logout');
  removeAccessToken();
  return response;
};

export { login, logout, refreshAccessToken, registration };
