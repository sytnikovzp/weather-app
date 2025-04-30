import { useCallback, useEffect, useState } from 'react';

import {
  getNextDayTemperatureChartData,
  getNextWeekTemperatureChartData,
} from '../utils/sharedFunctions';

import { weatherService } from '../services';

function useWeatherForCity(latitude, longitude) {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [nextDayForecastData, setNextDayForecastData] = useState(null);
  const [nextWeekForecastData, setNextWeekForecastData] = useState(null);
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

      const nextDayForecastData = getNextDayTemperatureChartData(forecastData);
      const nextWeekForecastData =
        getNextWeekTemperatureChartData(forecastData);

      setCurrentWeatherData(currentWeatherData);
      setNextDayForecastData(nextDayForecastData);
      setNextWeekForecastData(nextWeekForecastData);
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
    nextDayForecastData,
    nextWeekForecastData,
    isFetching,
    errorMessage,
    onRefresh: fetchWeatherData,
  };
}

export default useWeatherForCity;
