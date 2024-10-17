/* eslint-disable no-underscore-dangle */
import axios from 'axios';
// ==============================================================
import { BASE_URL } from '../constants';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.log('No AccessToken, need to sign in');
      return null;
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await api.get('/auth/refresh');

        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

        localStorage.setItem('accessToken', data.accessToken);

        return api.request(originalRequest);
      } catch (err) {
        console.log('Refresh error is: -------', err);
      }
    }
    return Promise.reject(error);
  }
);

export const addCityToFavorites = (openWeatherId, cityName, country) => {
  return api.post('/favorites', {
    openWeatherId,
    cityName,
    country,
  });
};

export const removeCityFromFavorites = (openWeatherId) => {
  return api.delete(`/favorites/${openWeatherId}`);
};

export const getFavoriteCities = () => {
  return api.get('/favorites');
};

export default api;
