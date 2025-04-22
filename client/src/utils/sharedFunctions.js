import { format } from 'date-fns';

const getAccessToken = () => {
  const token = localStorage.getItem('weatherAppToken');
  if (token === 'undefined') {
    localStorage.removeItem('weatherAppToken');
    return null;
  }
  return token;
};

const saveAccessToken = (token) =>
  localStorage.setItem('weatherAppToken', token);

const removeAccessToken = () => localStorage.removeItem('weatherAppToken');

const formatDateTime = (timestamp, dateFormat) =>
  format(new Date(timestamp * 1000), dateFormat);

const formatWeeklyData = (forecastData) => {
  const dailyData = forecastData.list.reduce((acc, data) => {
    const [date] = data.dt_txt.split(' ');
    if (!acc[date]) {
      acc[date] = { sum: 0, count: 0 };
    }
    acc[date].sum += data.main.temp;
    acc[date].count += 1;
    return acc;
  }, {});
  const labels = Object.keys(dailyData);
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
    labels,
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

const processWeeklyTemperatureData = (data) => {
  const dailyData = data.list.reduce((acc, current) => {
    const date = new Date(current.dt * 1000).toLocaleDateString([], {
      day: '2-digit',
      month: '2-digit',
    });
    if (acc[date]) {
      acc[date].tempSum += current.main.temp;
      acc[date].count += 1;
    } else {
      acc[date] = {
        tempSum: current.main.temp,
        count: 1,
      };
    }
    return acc;
  }, {});
  const labels = Object.keys(dailyData);
  const temperatures = Object.values(dailyData).map((day) =>
    Math.round(day.tempSum / day.count)
  );
  return {
    labels,
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

const setErrorState = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const setLoadingState = (state) => {
  state.isLoading = true;
  state.error = null;
};

export {
  formatDateTime,
  formatWeeklyData,
  getAccessToken,
  getDayLabel,
  getWindDirection,
  processTemperatureData,
  processWeeklyTemperatureData,
  removeAccessToken,
  saveAccessToken,
  setErrorState,
  setLoadingState,
};
