import { formatDate, getWindDirection } from '../../services/weatherService';
// ==============================================================
import './WeatherCard.css';

const WeatherCard = ({
  cityName,
  cityCountry,
  weatherData,
  loading,
  error,
  onRefresh,
  isFavorite, 
}) => {
  return (
    <div className={`weather-card ${isFavorite ? 'favorite' : ''}`}>
      {weatherData && (
        <div className='weather-content'>
          <div className='updated-info'>
            <p>
              Updated at: {formatDate(weatherData.dt, 'dd MMMM yyyy, HH:mm')}
              <button className='refresh-button' onClick={onRefresh}>
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
                <strong>Visibility:</strong> {weatherData.visibility / 1000} km
              </p>
              <p>
                <strong>Humidity:</strong> {weatherData.main.humidity}%
              </p>
              <p>
                <strong>Sunrise:</strong>{' '}
                {formatDate(weatherData.sys.sunrise, 'HH:mm')}
              </p>
            </div>
            <div className='weather-column'>
              <p>
                <strong>Wind:</strong> {weatherData.wind.speed} m/s{' '}
                {getWindDirection(weatherData.wind.deg)}
              </p>
              <p>
                <strong>Cloudiness:</strong> {weatherData.clouds.all}%
              </p>
              <p>
                <strong>Sunset:</strong>{' '}
                {formatDate(weatherData.sys.sunset, 'HH:mm')}
              </p>
            </div>
          </div>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default WeatherCard;
