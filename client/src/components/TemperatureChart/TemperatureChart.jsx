/* eslint-disable consistent-return */
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

import useWeatherForCity from '../../hooks/useWeatherForCity';

import './TemperatureChart.css';

function TemperatureChart({ selectedCity }) {
  const chartRef = useRef(null);
  const [mode, setMode] = useState('day');
  const { latitude, longitude } = selectedCity;
  const { temperatureData } = useWeatherForCity(latitude, longitude);

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
        responsive: true,
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

  return (
    <div className='card'>
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
      <canvas ref={chartRef} className='chart-canvas' />
    </div>
  );
}

export default TemperatureChart;
