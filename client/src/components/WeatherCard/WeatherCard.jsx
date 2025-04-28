import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  faHeartCircleMinus,
  faHeartCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_SETTINGS } from '../../constants';
import useWeatherForCity from '../../hooks/useWeatherForCity';

import { selectFavorites } from '../../store/selectors/favoritesSelectors';
import {
  addToFavorites,
  fetchFavorites,
  removeFromFavorites,
} from '../../store/thunks/favoritesThunks';

import CurrentWeatherCard from '../CurrentWeatherCard/CurrentWeatherCard';
import ErrorMessageBlock from '../ErrorMessageBlock/ErrorMessageBlock';
import SpinerLoader from '../SpinerLoader/SpinerLoader';
import WeeklyForecastCard from '../WeeklyForecastCard/WeeklyForecastCard';

import './WeatherCard.css';

function WeatherCard({
  errorMessageUserCity,
  isLoadingUserCity,
  selectedCity,
  setIsModalOpen,
}) {
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
    isLoading: isLoadingWeather,
    errorMessage: errorMessageWeather,
    onRefresh,
  } = useWeatherForCity(latitude, longitude);

  const isLoading = isLoadingUserCity || isLoadingWeather;
  const errorMessage = errorMessageUserCity || errorMessageWeather;

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

  if (isLoading) {
    return (
      <div className='big-card'>
        <div className='status-container'>
          <SpinerLoader />
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className='big-card'>
        <div className='status-container'>
          <ErrorMessageBlock message={errorMessageUserCity} />
        </div>
      </div>
    );
  }

  return (
    <div className='big-card'>
      <div className='weather-view-toggle'>
        <button
          className={viewMode === 'current-weather' ? 'active' : ''}
          onClick={() => setViewMode('current-weather')}
        >
          На зараз
        </button>

        <button
          className={viewMode === 'forecast' ? 'active' : ''}
          onClick={() => setViewMode('forecast')}
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

      {viewMode === 'current-weather' && currentWeatherData && (
        <CurrentWeatherCard
          city={city}
          country={country}
          currentWeatherData={currentWeatherData}
          onRefresh={onRefresh}
        />
      )}

      {viewMode === 'forecast' &&
        weeklyWeatherData &&
        Array.isArray(weeklyWeatherData.labels) &&
        weeklyWeatherData.labels.length > 0 &&
        Array.isArray(weeklyWeatherData.datasets) &&
        weeklyWeatherData.datasets.length > 0 && (
          <WeeklyForecastCard weeklyWeatherData={weeklyWeatherData} />
        )}
    </div>
  );
}

export default WeatherCard;
