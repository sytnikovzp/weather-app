/* eslint-disable consistent-return */
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

import useWeatherForCity from '../../hooks/useWeatherForCity';

import ErrorMessageBlock from '../ErrorMessageBlock/ErrorMessageBlock';
import SpinerLoader from '../SpinerLoader/SpinerLoader';

function TemperatureChart({
  errorMessageUserCity,
  isFetchingUserCity,
  selectedCity,
}) {
  const chartRef = useRef(null);
  const [mode, setMode] = useState('day');
  const { latitude, longitude } = selectedCity;
  const {
    temperatureData,
    isFetching: isFetchingWeather,
    errorMessage: errorMessageWeather,
  } = useWeatherForCity(latitude, longitude);

  const isFetching = isFetchingUserCity || isFetchingWeather;
  const errorMessage = errorMessageUserCity || errorMessageWeather;

  const data =
    mode === 'day'
      ? temperatureData?.dayWeatherData
      : temperatureData?.weeklyWeatherData;

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!data || !ctx) {
      return;
    }
    const tempChart = new Chart(ctx, {
      type: 'line',
      data,
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: false,
            text: `Температура в ${selectedCity.city}`,
          },
        },
        interaction: { intersect: false },
        scales: {
          x: { display: true, title: { display: false } },
          y: { display: true, title: { display: false } },
        },
      },
    });

    return () => tempChart.destroy();
  }, [data, selectedCity.city, mode]);

  if (isFetching) {
    return (
      <div className='weather-big-card'>
        <div className='status-container'>
          <SpinerLoader />
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className='weather-big-card'>
        <div className='status-container'>
          <ErrorMessageBlock message={errorMessageUserCity} />
        </div>
      </div>
    );
  }

  return (
    <div className='weather-big-card'>
      <div className='weather-view-toggle'>
        <button
          className={mode === 'day' ? 'active' : ''}
          onClick={() => setMode('day')}
        >
          На сьогодні
        </button>

        <button
          className={mode === 'weekly' ? 'active' : ''}
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
