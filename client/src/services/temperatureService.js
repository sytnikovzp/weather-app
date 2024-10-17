import { getTemperatureData } from '../api';

const processTemperatureData = (data) => {
  const hourlyData = data.list.slice(0, 8);

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
};

export const fetchTemperatureData = async (selectedCity) => {
  try {
    const data = await getTemperatureData(selectedCity.cityName);
    return processTemperatureData(data);
  } catch (error) {
    console.log('Error fetching temperature data:', error.message);
    throw new Error('Error fetching temperature data');
  }
};
