import { weatherRest } from '../api/rest';
import { formatFiveDayData } from '../utils/sharedFunctions';

const fetchWeatherData = async (selectedCity) => {
  if (selectedCity.lat !== undefined && selectedCity.lon !== undefined) {
    try {
      const currentWeather = await weatherRest.fetchWeather(
        selectedCity.lat,
        selectedCity.lon
      );
      const fiveDayWeather = await weatherRest.fetchForecast(
        selectedCity.lat,
        selectedCity.lon
      );
      const formattedFiveDayData = formatFiveDayData(fiveDayWeather);
      return {
        currentWeather,
        fiveDayWeather: formattedFiveDayData,
      };
    } catch (error) {
      console.error('Помилка отримання даних про погоду:', error.message);
      throw new Error('Помилка отримання даних про погоду');
    }
  }
};

export { fetchWeatherData };
