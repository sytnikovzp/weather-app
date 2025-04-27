import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import useWeatherForCity from '../../hooks/useWeatherForCity';

import { selectFavorites } from '../../store/selectors/favoritesSelectors';
import {
  addToFavorites,
  fetchFavorites,
  removeFromFavorites,
} from '../../store/thunks/favoritesThunks';

import ErrorMessageBlock from '../ErrorMessageBlock/ErrorMessageBlock';
import WhenUpdated from '../WhenUpdated/WhenUpdated';

import './WeatherCard.css';

function WeatherCard({ selectedCity, setIsModalOpen }) {
  const [viewMode, setViewMode] = useState('current-weather');
  const { city, country, latitude, longitude } = selectedCity;

  const dispatch = useDispatch();

  const favorites = useSelector(selectFavorites);

  const cityExistsInFavorites = favorites.some(
    (favorite) => favorite.selectedCity === city.selectedCity
  );

  const {
    currentWeatherData,
    weeklyWeatherData,
    isLoading,
    errorMessage,
    onRefresh,
  } = useWeatherForCity(latitude, longitude);

  const handleAddToFavorites = async () => {
    if (favorites.length >= APP_SETTINGS.MAX_FAVORITES) {
      setIsModalOpen(true);
      return;
    }
    if (!selectedCity || !currentWeatherData?.sys) {
      return;
    }
    const { country } = currentWeatherData.sys;
    if (
      favorites.some(
        (favorite) =>
          favorite.latitude === latitude && favorite.longitude === longitude
      )
    ) {
      return;
    }
    try {
      await dispatch(addToFavorites({ city, country, latitude, longitude }));
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

  if (!favorites) {
    dispatch(fetchFavorites());
  }

  const handleToggleFavorite = (event) => {
    event.stopPropagation();
    cityExistsInFavorites
      ? handleRemoveFromFavorites()
      : handleAddToFavorites();
    fetchFavorites();
  };

  const handleRefresh = () => {
    onRefresh();
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
            icon={
              cityExistsInFavorites ? faHeartCircleMinus : faHeartCirclePlus
            }
          />
        </button>
      </div>
      {errorMessage && <ErrorMessageBlock message={errorMessage} />}
      {viewMode === 'current-weather' && currentWeatherData && (
        <div className='weather-content'>
          <WhenUpdated
            currentWeatherData={currentWeatherData}
            isLoading={isLoading}
            onRefresh={handleRefresh}
          />
          <div className='city-info'>
            <h3>{country}</h3>
            <h3>{city}</h3>
            <h3>{Math.round(currentWeatherData.main.temp)}°C</h3>
          </div>
          <div className='weather-description'>
            <p>
              Відчувається як {Math.round(currentWeatherData.main.feels_like)}°C
            </p>
            <p>
              {currentWeatherData.weather[0].description
                .charAt(0)
                .toUpperCase() +
                currentWeatherData.weather[0].description.slice(1)}
            </p>
          </div>

          <div className='weather-details'>
            <div>
              <p>
                <strong>Видимість: </strong>
                {Math.round(currentWeatherData.visibility / 1000)} км
              </p>
              <p>
                <strong>Вологість:</strong> {currentWeatherData.main.humidity}%
              </p>
              <p>
                <strong>Схід сонця: </strong>
                {formatDateTime(currentWeatherData.sys.sunrise, 'HH:mm')}
              </p>
            </div>
            <div>
              <p>
                <strong>Вітер: </strong>
                {Math.round(currentWeatherData.wind.speed)} м/с
                {getWindDirection(currentWeatherData.wind.deg)}
              </p>
              <p>
                <strong>Облачність:</strong> {currentWeatherData.clouds.all}%
              </p>
              <p>
                <strong>Захід сонця:</strong>
                {formatDateTime(currentWeatherData.sys.sunset, 'HH:mm')}
              </p>
            </div>
          </div>
        </div>
      )}
      {viewMode === 'forecast' &&
        weeklyWeatherData &&
        Array.isArray(weeklyWeatherData.labels) &&
        weeklyWeatherData.labels.length > 0 &&
        Array.isArray(weeklyWeatherData.datasets) &&
        weeklyWeatherData.datasets.length > 0 && (
          <div className='weekly-forecast'>
            {weeklyWeatherData.labels.map((_, index) => (
              <div key={index} className='weekly-item'>
                <p className='day-label'>{getDayLabel(index)}</p>
                <p>{weeklyWeatherData.datasets[0].data[index]}°C</p>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default WeatherCard;
