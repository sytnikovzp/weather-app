/* eslint-disable consistent-return */
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

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

  const [viewMode, setViewMode] = useState('day');
  const { latitude, longitude } = selectedCity;

  const {
    nextDayForecastData,
    nextWeekForecastData,
    isFetching: isFetchingForecast,
    errorMessage: errorMessageForecast,
  } = useWeatherForCity(latitude, longitude);

  const isFetching = isFetchingUserCity || isFetchingForecast;
  const errorMessage = errorMessageUserCity || errorMessageForecast;
  const forecastData =
    viewMode === 'day' ? nextDayForecastData : nextWeekForecastData;

  useEffect(() => {
    if (!forecastData || !chartRef.current) {
      return;
    }
    const ctx = chartRef.current.getContext('2d');
    if (chartInstanceRef.current) {
      chartInstanceRef.current.data = {
        ...forecastData,
        datasets: forecastData.datasets.map((dataset) => ({
          ...dataset,
          backgroundColor: '#5B92D9',
          borderColor: '#3A6EA5',
          pointBackgroundColor: '#3A6EA5',
          pointBorderColor: '#FFFFFF',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.3,
        })),
      };
      chartInstanceRef.current.update();
      return;
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        ...forecastData,
        datasets: forecastData.datasets.map((dataset) => ({
          ...dataset,
          backgroundColor: '#5B92D9',
          borderColor: '#3A6EA5',
          pointBackgroundColor: '#3A6EA5',
          pointBorderColor: '#FFFFFF',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.3,
        })),
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          tooltip: {
            backgroundColor: '#FFFFFF',
            borderColor: '#AAD4F5',
            borderWidth: 1,
            titleColor: '#333333',
            bodyColor: '#000000',
            padding: 10,
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 12 },
          },
        },
        interaction: { intersect: false },
        scales: {
          x: {
            ticks: { color: '#333333' },
            grid: { color: '#E0E0E0' },
          },
          y: {
            ticks: { color: '#333333' },
            grid: { color: '#E0E0E0' },
          },
        },
      },
    });

    return () => {
      chartInstanceRef.current?.destroy();
      chartInstanceRef.current = null;
    };
  }, [forecastData]);

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
          className={viewMode === 'day' ? 'active' : ''}
          type='button'
          onClick={() => setViewMode('day')}
        >
          На 24 години
        </button>
        <button
          className={viewMode === 'week' ? 'active' : ''}
          type='button'
          onClick={() => setViewMode('week')}
        >
          На тиждень
        </button>
      </div>
      <canvas ref={chartRef} height={190} width={260} />
    </div>
  );
}

export default TemperatureChart;
