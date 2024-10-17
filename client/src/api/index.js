/* eslint-disable no-underscore-dangle */
import axios from 'axios';
// ==============================================================
import { BASE_URL, WEATHER_API_KEY } from '../constants';

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
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

const handleApiError = (error) => {
  console.error('API Error:', error.message);
  throw new Error(error.message);
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

export const logout = async () => {
  try {
    await api.get('/auth/logout');
    localStorage.removeItem('accessToken');
  } catch (error) {
    console.log('Logout error:', error.message);
    throw new Error('Logout error');
  }
};

export const addCityToFavorites = (openWeatherId, cityName, country) => {
  return api
    .post('/favorites', {
      openWeatherId,
      cityName,
      country,
    })
    .catch(handleApiError);
};

export const removeCityFromFavorites = (openWeatherId) => {
  return api.delete(`/favorites/${openWeatherId}`).catch(handleApiError);
};

export const getFavoriteCities = () => {
  return api.get('/favorites').catch(handleApiError);
};

export const getWeather = async (cityName) => {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`;
    const response = await axios.get(weatherUrl);
    return response.data;
  } catch (error) {
    console.log('Error fetching weather data:', error.message);
    throw new Error('Failed to fetch weather data');
  }
};

export const getTemperatureData = async (cityName) => {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`;
    const response = await axios.get(weatherUrl);
    return response.data;
  } catch (error) {
    console.log('Error fetching temperature data:', error.message);
    throw new Error('Error fetching temperature data');
  }
};

export default api;
