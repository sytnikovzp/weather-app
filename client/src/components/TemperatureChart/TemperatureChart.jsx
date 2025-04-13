/* eslint-disable consistent-return */
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

import Preloader from '../Preloader/Preloader';

import './TemperatureChart.css';

function TemperatureChart({ cityName, dayData, fiveDayData, loading, error }) {
  const chartRef = useRef(null);
  const [mode, setMode] = useState('day');
  const data = mode === 'day' ? dayData : fiveDayData;

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
        plugins: {
          title: {
            display: false,
            text: `Температура в ${cityName}`,
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
  }, [data, cityName, mode]);

  return (
    <div className='temperature-chart'>
      <div className='view-toggle'>
        <button
          className={mode === 'day' ? 'active' : ''}
          onClick={() => setMode('day')}
        >
          Сьогодні
        </button>
        <button
          className={mode === '5days' ? 'active' : ''}
          onClick={() => setMode('5days')}
        >
          На 5 днів
        </button>
      </div>
      {loading && <Preloader message='Завантаження даних про температуру...' />}
      {error && <p>{error}</p>}
      <canvas ref={chartRef} />
    </div>
  );
}

export default TemperatureChart;
