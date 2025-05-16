import { useCallback, useEffect, useState } from 'react';

import {
  getNextDayTemperatureChartData,
  getNextWeekTemperatureChartData,
} from '../utils/weatherChartHelpers';

import { weatherService } from '../services';

function useForecastForCity(latitude, longitude) {
  const [nextDayForecastData, setNextDayForecastData] = useState(null);
  const [nextWeekForecastData, setNextWeekForecastData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchForecastData = useCallback(async () => {
    if (!latitude || !longitude) {
      return;
    }

    try {
      setIsFetching(true);
      setErrorMessage('');

      const forecastData = await weatherService.getForecast(
        latitude,
        longitude
      );

      const nextDayForecastData = getNextDayTemperatureChartData(forecastData);
      const nextWeekForecastData =
        getNextWeekTemperatureChartData(forecastData);

      setNextDayForecastData(nextDayForecastData);
      setNextWeekForecastData(nextWeekForecastData);
    } catch (error) {
      setErrorMessage(error.response?.data?.message);
    } finally {
      setIsFetching(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    fetchForecastData();
  }, [fetchForecastData]);

  return {
    nextDayForecastData,
    nextWeekForecastData,
    isFetching,
    errorMessage,
    onRefresh: fetchForecastData,
  };
}

export default useForecastForCity;
