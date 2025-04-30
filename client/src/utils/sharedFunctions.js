import { format } from 'date-fns';
import { uk } from 'date-fns/locale/uk';

const formatDateTime = (timestamp, dateFormat) =>
  format(new Date(timestamp * 1000), dateFormat, {
    locale: uk,
  });

const getWindDirection = (deg) => {
  if ((deg >= 0 && deg <= 22.5) || (deg > 337.5 && deg <= 360)) {
    return ' Півн.';
  }
  if (deg > 22.5 && deg <= 67.5) {
    return ' Пн-Сх';
  }
  if (deg > 67.5 && deg <= 112.5) {
    return ' Схід.';
  }
  if (deg > 112.5 && deg <= 157.5) {
    return ' Пд-Сх';
  }
  if (deg > 157.5 && deg <= 202.5) {
    return ' Півд.';
  }
  if (deg > 202.5 && deg <= 247.5) {
    return ' Пд-Зх';
  }
  if (deg > 247.5 && deg <= 292.5) {
    return ' Захід.';
  }
  if (deg > 292.5 && deg <= 337.5) {
    return ' Пн-Зх';
  }
  return 'Invalid degree';
};

const getDayLabel = (index) => {
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
  if (index === 0) {
    return 'Сьогодні';
  }
  if (index === 1) {
    return 'Завтра';
  }
  const dayOfWeek = new Date(today);
  dayOfWeek.setDate(today.getDate() + index);
  return dayNames[dayOfWeek.getDay()];
};

const getNextDayTemperatureChartData = (forecastData) => {
  const now = Date.now();
  const next24h = now + 24 * 60 * 60 * 1000;
  const next24HoursForecast = forecastData.list.filter((item) => {
    const timestamp = item.dt * 1000;
    return timestamp >= now && timestamp <= next24h;
  });
  const labels = next24HoursForecast.map((item) => {
    const date = new Date(item.dt * 1000);
    return date.toLocaleTimeString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit',
    });
  });
  const temperatures = next24HoursForecast.map((item) =>
    Math.round(item.main.temp)
  );
  return {
    labels,
    datasets: [
      {
        label: 'Прогноз температури на 24 години',
        data: temperatures,
      },
    ],
  };
};

function getNextWeekTemperatureChartData(forecastData) {
  const dailyData = {};
  for (const item of forecastData.list) {
    const [date] = item.dt_txt.split(' ');
    if (!dailyData[date]) {
      dailyData[date] = { sum: 0, count: 0 };
    }
    dailyData[date].sum += item.main.temp;
    dailyData[date].count += 1;
  }
  const labels = Object.keys(dailyData).map((date) => {
    const d = new Date(date);
    return d.toLocaleDateString('uk-UA', { weekday: 'short' });
  });
  const data = Object.values(dailyData).map((entry) =>
    Math.round(entry.sum / entry.count)
  );
  return {
    labels,
    datasets: [
      {
        label: 'Прогноз температури на тиждень',
        data,
      },
    ],
  };
}

export {
  formatDateTime,
  getDayLabel,
  getNextDayTemperatureChartData,
  getNextWeekTemperatureChartData,
  getWindDirection,
};
