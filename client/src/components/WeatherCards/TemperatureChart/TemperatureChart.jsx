/* eslint-disable consistent-return */
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  createChartInstance,
  destroyChartInstance,
  updateChartInstance,
} from '../../../utils/chartHelpers';
import useDelayedPreloader from '../../../hooks/useDelayedPreloader';
import useForecastForCity from '../../../hooks/useForecastForCity';

import ErrorMessageBlock from '../../ErrorMessageBlock/ErrorMessageBlock';
import SpinerLoader from '../../Loaders/SpinerLoader/SpinerLoader';

import './TemperatureChart.css';

function TemperatureChart({
  errorMessageUserCity,
  isFetchingUserCity,
  selectedCity,
}) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const [viewMode, setViewMode] = useState('day');
  const { latitude, longitude } = selectedCity;

  const {
    nextDayForecastData,
    nextWeekForecastData,
    isFetching: isFetchingForecast,
    errorMessage: errorMessageForecast,
  } = useForecastForCity(latitude, longitude);

  const isFetching = isFetchingUserCity || isFetchingForecast;
  const errorMessage = errorMessageUserCity || errorMessageForecast;
  const forecastData =
    viewMode === 'day' ? nextDayForecastData : nextWeekForecastData;

  const isPreloaderVisible = useDelayedPreloader(isFetching);

  useEffect(() => {
    if (!forecastData || !chartRef.current) {
      return;
    }
    const ctx = chartRef.current.getContext('2d');
    if (chartInstanceRef.current) {
      updateChartInstance(chartInstanceRef.current, forecastData);
      return;
    }
    chartInstanceRef.current = createChartInstance(ctx, forecastData);
    return () => {
      destroyChartInstance(chartInstanceRef);
    };
  }, [forecastData]);

  const handleSetDayMode = useCallback(() => {
    setViewMode('day');
  }, []);

  const handleSetWeekMode = useCallback(() => {
    setViewMode('week');
  }, []);

  if (isPreloaderVisible) {
    return (
      <div className='weather-container'>
        <div className='status-container'>
          <SpinerLoader />
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className='weather-container'>
        <div className='status-container'>
          <ErrorMessageBlock message={errorMessage} />
        </div>
      </div>
    );
  }

  return (
    <div className='weather-container'>
      <div className='weather-view-toggle'>
        <button
          className={viewMode === 'day' ? 'active' : ''}
          type='button'
          onClick={handleSetDayMode}
        >
          На 24 години
        </button>
        <button
          className={viewMode === 'week' ? 'active' : ''}
          type='button'
          onClick={handleSetWeekMode}
        >
          На тиждень
        </button>
      </div>
      <canvas ref={chartRef} height={190} width={260} />
    </div>
  );
}

export default TemperatureChart;
