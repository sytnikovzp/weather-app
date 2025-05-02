import Chart from 'chart.js/auto';

const chartStyleDataset = (dataset) => ({
  ...dataset,
  backgroundColor: '#5B92D9',
  borderColor: '#3A6EA5',
  pointBackgroundColor: '#3A6EA5',
  pointBorderColor: '#FFFFFF',
  pointRadius: 4,
  pointHoverRadius: 6,
  tension: 0.3,
});

const createChartInstance = (ctx, forecastData) =>
  new Chart(ctx, {
    type: 'line',
    data: {
      ...forecastData,
      datasets: forecastData.datasets.map(chartStyleDataset),
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        tooltip: {
          backgroundColor: '#FFFFFF',
          borderColor: '#AAD4F5',
          borderWidth: 1,
          titleColor: '#333333',
          bodyColor: '#000000',
          padding: 10,
          titleFont: { size: 14, weight: 'bold' },
          bodyFont: { size: 12 },
        },
      },
      interaction: { intersect: false },
      scales: {
        x: {
          ticks: { color: '#333333' },
          grid: { color: '#E0E0E0' },
        },
        y: {
          ticks: { color: '#333333' },
          grid: { color: '#E0E0E0' },
        },
      },
    },
  });

const updateChartInstance = (chartArg, forecastData) => {
  const chart = chartArg;
  const styledData = {
    ...forecastData,
    datasets: forecastData.datasets.map(chartStyleDataset),
  };
  chart.data = styledData;
  chart.update();
};

const destroyChartInstance = (chartRefArg) => {
  const chartRef = chartRefArg;
  const chart = chartRef.current;
  if (chart) {
    chart.destroy();
    chartRef.current = null;
  }
};

export { createChartInstance, destroyChartInstance, updateChartInstance };
