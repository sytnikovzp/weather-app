import { weatherRest } from '../api/rest';
import {
  processFiveDayTemperatureData,
  processTemperatureData,
} from '../utils/sharedFunctions';

const fetchTemperatureData = async (selectedCity) => {
  try {
    const data = await weatherRest.fetchForecast(
      selectedCity.lat,
      selectedCity.lon
    );
    const dayData = processTemperatureData(data);
    const fiveDayData = processFiveDayTemperatureData(data);
    return { dayData, fiveDayData };
  } catch (error) {
    console.error('Помилка отримання даних про температуру:', error.message);
    throw new Error('Помилка отримання даних про температуру');
  }
};

export { fetchTemperatureData };
