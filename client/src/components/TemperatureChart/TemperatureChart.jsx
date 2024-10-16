import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
// ==============================================================
import './TemperatureChart.css';

const TemperatureChart = ({ cityName, data, loading, error }) => {
  const chartRef = useRef(null);

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
              text: `Temperature in ${cityName} by Hours`,
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
                text: 'Time',
              },
            },
            y: {
              display: true,
              title: {
                display: false,
                text: 'Temperature (°C)',
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
  }, [data, cityName]);

  return (
    <div className='temperature-chart'>
      {loading && <p>Loading temperature data...</p>}
      {error && <p>{error}</p>}
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TemperatureChart;
