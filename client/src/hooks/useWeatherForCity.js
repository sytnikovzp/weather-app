import { useCallback, useState } from 'react';

import {
  formatWeeklyData,
  processTemperatureData,
  processWeeklyTemperatureData,
} from '../utils/sharedFunctions';

import { weatherService } from '../services';

function useWeatherForCity() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [weeklyWeatherData, setWeeklyWeatherData] = useState(null);
  const [temperatureData, setTemperatureData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchWeatherData = useCallback(async (latitude, longitude) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const currentWeather = await weatherService.getWeather(
        latitude,
        longitude
      );
      const forecastData = await weatherService.getForecast(
        latitude,
        longitude
      );
      const weeklyWeather = formatWeeklyData(forecastData);
      setCurrentWeatherData(currentWeather);
      setWeeklyWeatherData(weeklyWeather);
    } catch (error) {
      console.log('error', error);

      setErrorMessage(
        error.response?.data?.message || 'Ошибка при загрузке погоды'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTemperatureData = useCallback(async (latitude, longitude) => {
    try {
      const data = await weatherService.getForecast(latitude, longitude);
      const dayData = processTemperatureData(data);
      const weeklyWeatherData = processWeeklyTemperatureData(data);
      setTemperatureData({ dayData, weeklyWeatherData });
    } catch (error) {
      console.log('error', error);

      setErrorMessage(
        error.response?.data?.message || 'Ошибка при загрузке температуры'
      );
    }
  }, []);

  return {
    currentWeatherData,
    weeklyWeatherData,
    temperatureData,
    isLoading,
    errorMessage,
    fetchWeatherData,
    fetchTemperatureData,
  };
}

export default useWeatherForCity;
