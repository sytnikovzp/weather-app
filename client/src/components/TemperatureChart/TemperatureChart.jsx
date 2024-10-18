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
              display: true,
              text: `Temperature in ${cityName} (${
                mode === 'day' ? 'Day' : '5 Days'
              })`,
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
      <div className='chart-controls'>
        <button onClick={() => setMode('day')}>Day</button>
        <button onClick={() => setMode('5days')}>5 Days</button>
      </div>
      {loading && <p>Loading temperature data...</p>}
      {error && <p>{error}</p>}
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TemperatureChart;
