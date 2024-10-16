import axios from 'axios';
// ==============================================================
import { WEATHER_API_KEY } from '../constants';

export const getTemperatureData = async (cityName) => {
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

    return {
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
    };
  } catch (error) {
    console.log('Error fetching temperature data:', error.message);
    throw new Error('Error fetching temperature data');
  }
};
