import { useCallback, useEffect, useState } from 'react';

import {
  formatWeeklyData,
  processDayTemperatureData,
  processWeeklyTemperatureData,
} from '../utils/sharedFunctions';

import { weatherService } from '../services';

function useWeatherForCity(latitude, longitude) {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [weeklyWeatherData, setWeeklyWeatherData] = useState(null);
  const [temperatureData, setTemperatureData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchWeatherData = useCallback(async () => {
    if (!latitude || !longitude) {
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      const currentWeather = await weatherService.getWeather(
        latitude,
        longitude
      );
      const forecastData = await weatherService.getForecast(
        latitude,
        longitude
      );

      const weeklyWeather = formatWeeklyData(forecastData);
      const dayWeatherData = processDayTemperatureData(forecastData);
      const weeklyWeatherData = processWeeklyTemperatureData(forecastData);

      setCurrentWeatherData(currentWeather);
      setWeeklyWeatherData(weeklyWeather);
      setTemperatureData({ dayWeatherData, weeklyWeatherData });
    } catch (error) {
      setErrorMessage(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  return {
    currentWeatherData,
    weeklyWeatherData,
    temperatureData,
    isLoading,
    errorMessage,
    onRefresh: fetchWeatherData,
  };
}

export default useWeatherForCity;
