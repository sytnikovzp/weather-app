import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  faHeartCircleMinus,
  faHeartCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_SETTINGS } from '../../constants';
import {
  formatDateTime,
  getDayLabel,
  getWindDirection,
} from '../../utils/sharedFunctions';

import {
  addToFavorites,
  removeFromFavorites,
} from '../../store/thunks/favoritesThunks';

import WhenUpdated from '../WhenUpdated/WhenUpdated';

import './WeatherCard.css';

function WeatherCard({
  cityCountry,
  cityName,
  errorMessage,
  favorites,
  fetchFavorites,
  weeklyData,
  isFavorite,
  latitude,
  isLoading,
  longitude,
  setIsModalOpen,
  weatherData,
  onRefresh,
}) {
  const [viewMode, setViewMode] = useState('current-weather');

  const dispatch = useDispatch();

  const handleAddToFavorites = async () => {
    if (favorites.length >= APP_SETTINGS.MAX_FAVORITES) {
      setIsModalOpen(true);
      return;
    }
    if (!cityName || !weatherData?.sys) {
      return;
    }
    const { country } = weatherData.sys;
    if (
      favorites.some((fav) => fav.lat === latitude && fav.lon === longitude)
    ) {
      return;
    }
    try {
      await dispatch(
        addToFavorites({ cityName, country, latitude, longitude })
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      await dispatch(removeFromFavorites({ latitude, longitude }));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleToggleFavorite = (event) => {
    event.stopPropagation();
    isFavorite ? handleRemoveFromFavorites() : handleAddToFavorites();
    fetchFavorites();
  };

  return (
    <div className='card'>
      <div className='weather-view-toggle'>
        <button
          className={viewMode === 'current-weather' ? 'active' : ''}
          onClick={(event) => {
            event.stopPropagation();
            setViewMode('current-weather');
          }}
        >
          На зараз
        </button>

        <button
          className={viewMode === 'forecast' ? 'active' : ''}
          onClick={(event) => {
            event.stopPropagation();
            setViewMode('forecast');
          }}
        >
          На тиждень
        </button>

        <button className='favorite-button' onClick={handleToggleFavorite}>
          <FontAwesomeIcon
            icon={isFavorite ? faHeartCircleMinus : faHeartCirclePlus}
          />
        </button>
      </div>
      {errorMessage && <div className='error'>{errorMessage}</div>}
      {viewMode === 'current-weather' && weatherData && (
        <div className='weather-content'>
          <WhenUpdated
            isLoading={isLoading}
            weatherData={weatherData}
            onRefresh={onRefresh}
          />
          <div className='city-info'>
            <h3>{cityCountry}</h3>
            <h3>{cityName}</h3>
            <h3>{Math.round(weatherData.main.temp)}°C</h3>
          </div>
          <div className='weather-description'>
            <p>Відчувається як {Math.round(weatherData.main.feels_like)}°C</p>
            <p>
              {weatherData.weather[0].description.charAt(0).toUpperCase() +
                weatherData.weather[0].description.slice(1)}
            </p>
          </div>

          <div className='weather-details'>
            <div>
              <p>
                <strong>Видимість: </strong>
                {Math.round(weatherData.visibility / 1000)} км
              </p>
              <p>
                <strong>Вологість:</strong> {weatherData.main.humidity}%
              </p>
              <p>
                <strong>Схід сонця: </strong>
                {formatDateTime(weatherData.sys.sunrise, 'HH:mm')}
              </p>
            </div>
            <div>
              <p>
                <strong>Вітер:</strong> {Math.round(weatherData.wind.speed)} м/с
                {getWindDirection(weatherData.wind.deg)}
              </p>
              <p>
                <strong>Облачність:</strong> {weatherData.clouds.all}%
              </p>
              <p>
                <strong>Захід сонця:</strong>
                {formatDateTime(weatherData.sys.sunset, 'HH:mm')}
              </p>
            </div>
          </div>
        </div>
      )}
      {viewMode === 'forecast' &&
        weeklyData &&
        Array.isArray(weeklyData.labels) &&
        weeklyData.labels.length > 0 &&
        Array.isArray(weeklyData.datasets) &&
        weeklyData.datasets.length > 0 && (
          <div className='weekly-forecast'>
            {weeklyData.labels.map((_, index) => (
              <div key={index} className='weekly-item'>
                <p className='day-label'>{getDayLabel(index)}</p>
                <p>{weeklyData.datasets[0].data[index]}°C</p>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default WeatherCard;
