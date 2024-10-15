import axios from 'axios';
import { useEffect, useState } from 'react';
// ==============================================================
import { WEATHER_API_KEY } from '../../constants';
import { formatDate, getWindDirection } from '../../services/weatherService';
// ==============================================================
import './WeatherCard.css';

const WeatherCard = ({ cityName, cityState, cityCountry }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`;

    const getWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(weatherUrl);
        setWeatherData(response.data);
      } catch (error) {
        setError('Error fetching weather data');
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (cityName) {
      getWeather();
    }
  }, [cityName]);

  return (
    <div className='weather-card'>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt='weather icon'
          />
          <h2>{cityName}</h2>
          <h3>{cityState}</h3>
          <h4>{cityCountry}</h4>

          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {Math.round(weatherData.main.temp)} °C</p>
          <p>Feels like: {Math.round(weatherData.main.feels_like)} °C</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
          <p>Atmospheric pressure: {weatherData.main.pressure} hPa</p>
          <p>Cloudiness: {weatherData.clouds.all} %</p>
          <p>Visibility: {weatherData.visibility} meter</p>
          <p>Wind speed: {weatherData.wind.speed} meter/sec</p>
          <p>Wind direction: {getWindDirection(weatherData.wind.deg)}</p>
          <p>Sunrise: {formatDate(weatherData.sys.sunrise, 'HH:mm')}</p>
          <p>Sunset: {formatDate(weatherData.sys.sunset, 'HH:mm')}</p>
          <p>Updated at: {formatDate(weatherData.dt, 'dd MMMM yyyy, HH:mm')}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
