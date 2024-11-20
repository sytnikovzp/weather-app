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

export const fetchFavoriteCities = async () => {
  try {
    const response = await api.get('/favorites');
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching favorite cities');
  }
};

export const addCityToFavorites = async (
  cityName,
  country,
  latitude,
  longitude
) => {
  try {
    const response = await api.post('/favorites', {
      cityName,
      country,
      latitude,
      longitude,
    });
    return response;
  } catch (error) {
    handleError(error, 'Error adding city to favorites');
  }
};

export const removeCityFromFavorites = async (latitude, longitude) => {
  try {
    await api.delete(`/favorites?latitude=${latitude}&longitude=${longitude}`);
  } catch (error) {
    handleError(error, 'Error removing city from favorites');
  }
};

export const fetchLocationByIP = async () => {
  try {
    let response = await axios.get('https://ipapi.co/json');
    const { latitude, longitude } = response.data;
    return { latitude, longitude };
  } catch (error) {
    console.log(error.message, ': Error with ipapi.co, try ipwho.is...');
    try {
      let response = await axios.get('http://ipwho.is');
      const { latitude, longitude } = response.data;
      return { latitude, longitude };
    } catch (error) {
      return handleError(error, 'Failed to fetch location by IP');
    }
  }
};

export const fetchCitySuggestions = async (searchTerm) => {
  try {
    const response = await axios.get(
      'http://api.openweathermap.org/geo/1.0/direct',
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

export const fetchWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          lat: latitude,
          lon: longitude,
          units: 'metric',
          appid: WEATHER_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch weather data');
  }
};

export const fetchForecast = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/forecast',
      {
        params: {
          lat: latitude,
          lon: longitude,
          units: 'metric',
          appid: WEATHER_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleError(error, 'Failed to fetch forecast data');
  }
};

export default api;
