import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
// ==============================================================
import { WEATHER_API_KEY } from '../../constants';
import './TemperatureChart.css';

const TemperatureChart = ({ cityName }) => {
  const chartRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemperatureData = async () => {
      setLoading(true);
      setError(null);
      try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`;
        const response = await axios.get(weatherUrl);
        const hourlyData = response.data.list.slice(0, 8);

        const labels = hourlyData.map((item) =>
          new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        );
        const temperatures = hourlyData.map((item) => item.main.temp);

        setData({
          labels: labels,
          datasets: [
            {
              label: 'Temperature (°C)',
              data: temperatures,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false,
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        setError('Error fetching temperature data');
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (cityName) {
      fetchTemperatureData();
    }
  }, [cityName]);

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
