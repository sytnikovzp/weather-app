import { useState } from 'react';
// ==============================================================
import {
  formatDate,
  getDayLabel,
  getWindDirection,
} from '../../services/weatherService';
// ==============================================================
import Preloader from '../Preloader/Preloader';
// ==============================================================
import './WeatherCard.css';

const WeatherCard = ({
  cityName,
  cityCountry,
  weatherData,
  fiveDayData,
  loading,
  error,
  onRefresh,
  isFavorite,
}) => {
  const [viewMode, setViewMode] = useState('current');
  return (
    <div className={`weather-card ${isFavorite ? 'favorite' : ''}`}>
      <div className='view-toggle'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setViewMode('current');
          }}
          className={viewMode === 'current' ? 'active' : ''}
        >
          Зараз
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setViewMode('forecast');
          }}
          className={viewMode === 'forecast' ? 'active' : ''}
        >
          На 5 днів
        </button>
      </div>
      {loading && <Preloader message='Завантаження даних про погоду...' />}
      {error && <p>{error}</p>}
      {viewMode === 'current' && weatherData && (
        <div className='weather-content'>
          <div className='updated-info'>
            <p>
              Оновлено: {formatDate(weatherData.dt, 'dd MMMM yyyy, HH:mm')}
              <button
                className='refresh-button'
                onClick={(e) => {
                  e.stopPropagation();
                  onRefresh();
                }}
              >
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
            Відчувається як {Math.round(weatherData.main.feels_like)}°C.{' '}
            {weatherData.weather[0].description.charAt(0).toUpperCase() +
              weatherData.weather[0].description.slice(1)}
            .
          </p>
          <div className='weather-details'>
            <div className='weather-column'>
              <p>
                <strong>Видимість:</strong> {weatherData.visibility / 1000} км
              </p>
              <p>
                <strong>Вологість:</strong> {weatherData.main.humidity}%
              </p>
              <p>
                <strong>Схід сонця:</strong>{' '}
                {formatDate(weatherData.sys.sunrise, 'HH:mm')}
              </p>
            </div>
            <div className='weather-column'>
              <p>
                <strong>Вітер:</strong> {weatherData.wind.speed} м/с{' '}
                {getWindDirection(weatherData.wind.deg)}
              </p>
              <p>
                <strong>Облачність:</strong> {weatherData.clouds.all}%
              </p>
              <p>
                <strong>Захід сонця:</strong>{' '}
                {formatDate(weatherData.sys.sunset, 'HH:mm')}
              </p>
            </div>
          </div>
        </div>
      )}
      {viewMode === 'forecast' &&
        fiveDayData &&
        Array.isArray(fiveDayData.labels) &&
        fiveDayData.labels.length > 0 &&
        Array.isArray(fiveDayData.datasets) &&
        fiveDayData.datasets.length > 0 && (
          <div className='five-day-forecast'>
            <div className='five-day-details'>
              {fiveDayData.labels.map((_, index) => (
                <div key={index} className='five-day-item'>
                  <p className='day-label'>{getDayLabel(index)}</p>
                  <p className='temperature'>
                    {fiveDayData.datasets[0].data[index]}°C
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default WeatherCard;
