/* eslint-disable consistent-return */
import { useEffect, useRef, useState } from 'react';

import {
  createChartInstance,
  destroyChartInstance,
  updateChartInstance,
} from '../../../utils/chartHelpers';
import useWeatherForCity from '../../../hooks/useWeatherForCity';

import ErrorMessageBlock from '../../ErrorMessageBlock/ErrorMessageBlock';
import SpinerLoader from '../../Loaders/SpinerLoader/SpinerLoader';

function TemperatureChart({
  errorMessageUserCity,
  isFetchingUserCity,
  selectedCity,
}) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const [mode, setMode] = useState('day');
  const { latitude, longitude } = selectedCity;

  const {
    todayForecastData,
    weeklyForecastData,
    isFetching: isFetchingForecast,
    errorMessage: errorMessageForecast,
  } = useWeatherForCity(latitude, longitude);

  const isFetching = isFetchingUserCity || isFetchingForecast;
  const errorMessage = errorMessageUserCity || errorMessageForecast;
  const data = mode === 'day' ? todayForecastData : weeklyForecastData;

  useEffect(() => {
    if (!data || !chartRef.current) {
      return;
    }

    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      updateChartInstance(chartInstanceRef.current, data);
    } else {
      chartInstanceRef.current = createChartInstance(ctx, data);
    }

    return () => {
      if (chartInstanceRef.current) {
        destroyChartInstance(chartInstanceRef.current);
      }
    };
  }, [data]);

  if (isFetching) {
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
          className={mode === 'day' ? 'active' : ''}
          type='button'
          onClick={() => setMode('day')}
        >
          На сьогодні
        </button>
        <button
          className={mode === 'weekly' ? 'active' : ''}
          type='button'
          onClick={() => setMode('weekly')}
        >
          На тиждень
        </button>
      </div>
      <canvas ref={chartRef} height={190} width={260} />
    </div>
  );
}

export default TemperatureChart;
