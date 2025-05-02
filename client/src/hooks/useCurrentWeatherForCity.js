import { useCallback, useEffect, useState } from 'react';

import { weatherService } from '../services';

function useCurrentWeatherForCity(latitude, longitude) {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
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

      setCurrentWeatherData(currentWeatherData);
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
    isFetching,
    errorMessage,
    onRefresh: fetchWeatherData,
  };
}

export default useCurrentWeatherForCity;
