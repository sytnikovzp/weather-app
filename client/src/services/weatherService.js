import { format } from 'date-fns';
import { getWeather, getWeatherForecast, getFavoriteCities } from '../api';

export const formatDate = (timestamp, dateFormat) => {
  return format(new Date(timestamp * 1000), dateFormat);
};

export function getWindDirection(deg) {
  if ((deg >= 0 && deg <= 22.5) || (deg > 337.5 && deg <= 360)) {
    return 'Півн.';
  } else if (deg > 22.5 && deg <= 67.5) {
    return 'Пн-Сх.';
  } else if (deg > 67.5 && deg <= 112.5) {
    return 'Схід.';
  } else if (deg > 112.5 && deg <= 157.5) {
    return 'Пд-Сх';
  } else if (deg > 157.5 && deg <= 202.5) {
    return 'Півд.';
  } else if (deg > 202.5 && deg <= 247.5) {
    return 'Пд-Зх.';
  } else if (deg > 247.5 && deg <= 292.5) {
    return 'Зах.';
  } else if (deg > 292.5 && deg <= 337.5) {
    return 'Пн-Зх.';
  } else {
    return 'Invalid degree';
  }
}

const formatFiveDayData = (forecastData) => {
  const dailyData = forecastData.list.reduce((acc, data) => {
    const date = data.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = { sum: 0, count: 0 };
    }
    acc[date].sum += data.main.temp;
    acc[date].count += 1;
    return acc;
  }, {});
  const labels = Object.keys(dailyData).slice(0, 5);
  const data = labels.map((date) =>
    Math.round(dailyData[date].sum / dailyData[date].count)
  );
  return {
    labels,
    datasets: [
      {
        data,
      },
    ],
  };
};

export const getDayLabel = (index) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayNames = [
    'Неділя',
    'Понеділок',
    'Вівторок',
    'Середа',
    'Четвер',
    'П’ятниця',
    'Субота',
  ];
  if (index === 0) return 'Сьогодні';
  if (index === 1) return 'Завтра';
  const dayOfWeek = new Date(today);
  dayOfWeek.setDate(today.getDate() + index);
  return dayNames[dayOfWeek.getDay()];
};

export const fetchWeatherData = async (selectedCity) => {
  try {
    const currentWeather = await getWeather(selectedCity.cityName);
    const fiveDayWeather = await getWeatherForecast(selectedCity.cityName);
    const formattedFiveDayData = formatFiveDayData(fiveDayWeather);
    return {
      currentWeather,
      fiveDayWeather: formattedFiveDayData,
    };
  } catch (error) {
    console.log('Error fetching weather data:', error.message);
    throw new Error('Error fetching weather data');
  }
};

export const fetchFavorites = async () => {
  try {
    const data = await getFavoriteCities();
    return data;
  } catch (error) {
    console.log('Error loading list of favorite cities:', error.message);
    throw new Error('Error loading list of favorite cities');
  }
};
