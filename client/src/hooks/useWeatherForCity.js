import { useCallback, useEffect, useState } from 'react';

import {
  getTodayTemperatureChartData,
  getWeeklyTemperatureChartData,
} from '../utils/sharedFunctions';

import { weatherService } from '../services';

function useWeatherForCity(latitude, longitude) {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [todayForecastData, setTodayForecastData] = useState(null);
  const [weeklyForecastData, setWeeklyForecastData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchWeatherData = useCallback(async () => {
    if (!latitude || !longitude) {
      return;
    }

    try {
      setIsFetching(true);
      setErrorMessage('');
      const currentWeatherData = await weatherService.getWeather(
        latitude,
        longitude
      );
      const forecastData = await weatherService.getForecast(
        latitude,
        longitude
      );

      const todayForecastData = getTodayTemperatureChartData(forecastData);
      const weeklyForecastData = getWeeklyTemperatureChartData(forecastData);

      setCurrentWeatherData(currentWeatherData);
      setTodayForecastData(todayForecastData);
      setWeeklyForecastData(weeklyForecastData);
    } catch (error) {
      setErrorMessage(error.response?.data?.message);
    } finally {
      setIsFetching(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  return {
    currentWeatherData,
    todayForecastData,
    weeklyForecastData,
    isFetching,
    errorMessage,
    onRefresh: fetchWeatherData,
  };
}

export default useWeatherForCity;
