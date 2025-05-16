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

const getNextWeekTemperatureChartData = (forecastData) => {
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
};

export { getNextDayTemperatureChartData, getNextWeekTemperatureChartData };
