import axios from 'axios';

import { APP_SETTINGS } from '../constants';

const getCitySuggestions = async (searchTerm) => {
  const { data } = await axios.get(
    'http://api.openweathermap.org/geo/1.0/direct',
    {
      params: {
        q: searchTerm,
        limit: 5,
        appid: APP_SETTINGS.WEATHER_API_KEY,
      },
    }
  );
  return data;
};

const getWeather = async (latitude, longitude) => {
  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        lat: latitude,
        lon: longitude,
        units: 'metric',
        appid: APP_SETTINGS.WEATHER_API_KEY,
      },
    }
  );
  return data;
};

const getForecast = async (latitude, longitude) => {
  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/forecast',
    {
      params: {
        lat: latitude,
        lon: longitude,
        units: 'metric',
        appid: APP_SETTINGS.WEATHER_API_KEY,
      },
    }
  );
  return data;
};

export { getCitySuggestions, getForecast, getWeather };
