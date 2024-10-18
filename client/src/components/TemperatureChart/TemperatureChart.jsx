import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
// ==============================================================
import './TemperatureChart.css';

const TemperatureChart = ({
  cityName,
  dayData,
  fiveDayData,
  loading,
  error,
}) => {
  const chartRef = useRef(null);
  const [mode, setMode] = useState('day');

  const data = mode === 'day' ? dayData : fiveDayData;

  useEffect(() => {
    if (data) {
      const ctx = chartRef.current.getContext('2d');
      const config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: false,
              text: `Температура в ${cityName}`,
            },
          },
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              display: true,
              title: {
                display: false,
              },
            },
            y: {
              display: true,
              title: {
                display: false,
              },
            },
          },
        },
      };

      const tempChart = new Chart(ctx, config);

      return () => {
        tempChart.destroy();
      };
    }
  }, [data, cityName, mode]);

  return (
    <div className='temperature-chart'>
      <div className='view-toggle'>
        <button
          onClick={() => setMode('day')}
          className={mode === 'day' ? 'active' : ''}
        >
          Сьогодні
        </button>
        <button
          onClick={() => setMode('5days')}
          className={mode === '5days' ? 'active' : ''}
        >
          На 5 днів
        </button>
      </div>
      {loading && <p>Завантаження даних про температуру...</p>}
      {error && <p>{error}</p>}
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TemperatureChart;
