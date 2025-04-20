import { saveAccessToken } from '../utils/sharedFunctions';
import api from '../api';

const registration = async (fullName, email, password) => {
  const { data } = await api.post('/auth/registration', {
    fullName,
    email,
    password,
  });
  saveAccessToken(data.accessToken);
  return data;
};

const login = async (email, password) => {
  const { data } = await api.post('/auth/login', {
    email,
    password,
  });
  saveAccessToken(data.accessToken);
  return data;
};

const refreshAccessToken = async () => {
  const { data } = await api.get('/auth/refresh');
  return data;
};

const logout = async () => {
  const { data } = await api.get('/auth/logout');
  return data;
};

export { login, logout, refreshAccessToken, registration };
