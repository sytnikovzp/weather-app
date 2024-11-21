import axios from 'axios';
// ==============================================================
import { WEATHER_API_KEY } from '../../constants';

const fetchCitySuggestions = async (searchTerm) => {
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
};

const fetchWeather = async (latitude, longitude) => {
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
};

const fetchForecast = async (latitude, longitude) => {
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
};

export default { fetchCitySuggestions, fetchWeather, fetchForecast };
