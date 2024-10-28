import { getWeatherForecast } from '../api';

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
        label: 'Температура на сьогодні (°C)',
        data: temperatures,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.4,
      },
    ],
  };
};

const processFiveDayTemperatureData = (data) => {
  const dailyData = data.list.reduce((acc, current) => {
    const date = new Date(current.dt * 1000).toLocaleDateString([], {
      day: '2-digit',
      month: '2-digit',
    });

    if (!acc[date]) {
      acc[date] = {
        tempSum: current.main.temp,
        count: 1,
      };
    } else {
      acc[date].tempSum += current.main.temp;
      acc[date].count += 1;
    }
    return acc;
  }, {});

  const labels = Object.keys(dailyData);
  const temperatures = Object.values(dailyData).map((day) =>
    Math.round(day.tempSum / day.count)
  );

  return {
    labels: labels,
    datasets: [
      {
        label: 'Середня температура на день (°C)',
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
    const data = await getWeatherForecast(selectedCity.lat, selectedCity.lon);
    const dayData = processTemperatureData(data);
    const fiveDayData = processFiveDayTemperatureData(data);
    return { dayData, fiveDayData };
  } catch (error) {
    console.log('Error fetching temperature data:', error.message);
    throw new Error('Error fetching temperature data');
  }
};
