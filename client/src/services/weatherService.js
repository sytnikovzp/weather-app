import axios from 'axios';
import { format } from 'date-fns';
// ==============================================================
import { WEATHER_API_KEY } from '../constants';
import { getFavoriteCities } from '../api';

export const formatDate = (timestamp, dateFormat) => {
  return format(new Date(timestamp * 1000), dateFormat);
};

export function getWindDirection(deg) {
  if ((deg >= 0 && deg <= 22.5) || (deg > 337.5 && deg <= 360)) {
    return 'North';
  } else if (deg > 22.5 && deg <= 67.5) {
    return 'N-East';
  } else if (deg > 67.5 && deg <= 112.5) {
    return 'East';
  } else if (deg > 112.5 && deg <= 157.5) {
    return 'S-East';
  } else if (deg > 157.5 && deg <= 202.5) {
    return 'South';
  } else if (deg > 202.5 && deg <= 247.5) {
    return 'S-West';
  } else if (deg > 247.5 && deg <= 292.5) {
    return 'West';
  } else if (deg > 292.5 && deg <= 337.5) {
    return 'N-West';
  } else {
    return 'Invalid degree';
  }
}

const getWeather = async (cityName) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`;
  try {
    const response = await axios.get(weatherUrl);
    return response.data;
  } catch (error) {
    console.log('Error fetching weather data:', error.message);
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchWeatherData = async (selectedCity) => {
  try {
    const data = await getWeather(selectedCity.cityName);
    return data;
  } catch (error) {
    console.log('Error fetching weather data:', error.message);
    throw new Error('Error fetching weather data');
  }
};

export const fetchFavorites = async () => {
  try {
    const response = await getFavoriteCities();
    return response.data;
  } catch (error) {
    console.log('Error loading list of favorite cities:', error.message);
    throw new Error('Error loading list of favorite cities');
  }
};
