/* eslint-disable no-underscore-dangle */
import axios from 'axios';
// ==============================================================
import { BASE_URL, WEATHER_API_KEY } from '../constants';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const handleError = (error, customMessage = 'API Error') => {
  const message =
    error.response?.data?.message || error.message || customMessage;
  console.error(`${customMessage}: ${message}`);
  throw new Error(message);
};

const getAccessToken = () => localStorage.getItem('accessToken');

const fetchOpenWeatherData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch OpenWeather data');
  }
};

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const accessToken = getAccessToken();
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
        if (err.response.status === 401) {
          console.warn('Access token expired and refresh failed.');
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export const fetchUserProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    return handleError(error, 'Error fetching user profile');
  }
};

export const logout = async () => {
  try {
    await api.get('/auth/logout');
    localStorage.removeItem('accessToken');
  } catch (error) {
    return handleError(error, 'Logout error');
  }
};

export const fetchCitySuggestions = async (searchTerm) => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct`,
      {
        params: {
          q: searchTerm,
          limit: 10,
          appid: WEATHER_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleError(error, 'Error fetching city suggestions');
  }
};

export const addCityToFavorites = async (openWeatherId, cityName, country) => {
  try {
    const response = await api.post('/favorites', {
      openWeatherId,
      cityName,
      country,
    });
    return response;
  } catch (error) {
    handleError(error, 'Error adding city to favorites');
  }
};

export const removeCityFromFavorites = async (openWeatherId) => {
  try {
    await api.delete(`/favorites/${openWeatherId}`);
  } catch (error) {
    handleError(error, 'Error removing city from favorites');
  }
};

export const getFavoriteCities = async () => {
  try {
    const response = await api.get('/favorites');
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching favorite cities');
  }
};

export const fetchLocationByIP = async () => {
  try {
    const response = await axios.get(`https://ipapi.co/json/`);
    const { latitude, longitude } = response.data;
    return { latitude, longitude };
  } catch (error) {
    return handleError(error, 'Failed to fetch location by IP');
  }
};

export const getWeatherByCoordinates = async (latitude, longitude) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`;
  return fetchOpenWeatherData(weatherUrl);
};

export const getWeather = (cityName) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`;
  return fetchOpenWeatherData(weatherUrl);
};

export const getWeatherForecast = (cityName) => {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`;
  return fetchOpenWeatherData(forecastUrl);
};

export default api;
