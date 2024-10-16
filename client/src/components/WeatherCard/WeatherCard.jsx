import axios from 'axios';
import { useEffect, useState, useCallback } from 'react'; // добавлен useCallback
// ==============================================================
import { WEATHER_API_KEY } from '../../constants';
import { formatDate, getWindDirection } from '../../services/weatherService';
// ==============================================================
import './WeatherCard.css';

const WeatherCard = ({ cityName, cityCountry }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Функция для получения погоды
  const getWeather = useCallback(async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`;

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
  }, [cityName]);

  useEffect(() => {
    if (cityName) {
      getWeather();
    }
  }, [cityName, getWeather]);

  console.log(weatherData);

  return (
    <div className='weather-card'>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className='weather-content'>
          <div className='updated-info'>
            <p>
              Updated at: {formatDate(weatherData.dt, 'dd MMMM yyyy, HH:mm')}
              <button className='refresh-button' onClick={getWeather}>
                ⟳
              </button>
            </p>
          </div>

          <div className='city-info'>
            <h2>
              {cityName}, {cityCountry}
            </h2>
            <div className='weather-info'>
              <h2>{Math.round(weatherData.main.temp)}°C</h2>
              <img
                className='icon'
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt='weather icon'
              />
            </div>
          </div>

          <p className='weather-description'>
            Feels like {Math.round(weatherData.main.feels_like)}°C.{' '}
            {weatherData.weather[0].description.charAt(0).toUpperCase() +
              weatherData.weather[0].description.slice(1)}
            .
          </p>

          <div className='weather-details'>
            <div className='weather-column'>
              <p>
                <strong>Humidity:</strong> {weatherData.main.humidity}%
              </p>
              <p>
                <strong>Visibility:</strong> {weatherData.visibility / 1000} km
              </p>
              <p>
                <strong>Sunrise:</strong>{' '}
                {formatDate(weatherData.sys.sunrise, 'HH:mm')}
              </p>
            </div>
            <div className='weather-column'>
              <p>
                <strong>Cloudiness:</strong> {weatherData.clouds.all}%
              </p>
              <p>
                <strong>Wind:</strong> {weatherData.wind.speed} m/s{' '}
                {getWindDirection(weatherData.wind.deg)}
              </p>
              <p>
                <strong>Sunset:</strong>{' '}
                {formatDate(weatherData.sys.sunset, 'HH:mm')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
