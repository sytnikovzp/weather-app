import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  faHeartCircleMinus,
  faHeartCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useFavorites from '../../../hooks/useFavorites';
import useWeatherForCity from '../../../hooks/useWeatherForCity';

import { clearFavoritesError } from '../../../store/slices/favoritesSlice';

import ErrorMessageBlock from '../../ErrorMessageBlock/ErrorMessageBlock';
import SpinerLoader from '../../Loaders/SpinerLoader/SpinerLoader';
import ModalWindow from '../../ModalWindow/ModalWindow';
import CurrentWeatherCard from '../CurrentWeatherCard/CurrentWeatherCard';
import WeeklyForecastCard from '../WeeklyForecastCard/WeeklyForecastCard';

function WeatherCard({
  errorMessageUserCity,
  isFetchingUserCity,
  selectedCity,
}) {
  const [viewMode, setViewMode] = useState('current-weather');
  const { city, country, latitude, longitude } = selectedCity;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(clearFavoritesError());
    setIsModalOpen(false);
  }, [dispatch]);

  const {
    currentWeatherData,
    weeklyForecastData,
    isFetching: isFetchingWeather,
    error: errorMessageWeather,
    onRefresh,
  } = useWeatherForCity(latitude, longitude);

  const {
    cityExistsInFavorites,
    isFetching: isFetchingFavorites,
    error: errorMessageFavorites,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  } = useFavorites(city, country, latitude, longitude);

  const isFetching =
    isFetchingUserCity || isFetchingWeather || isFetchingFavorites;
  const error = errorMessageUserCity || errorMessageWeather;

  useEffect(() => {
    if (
      errorMessageFavorites &&
      errorMessageFavorites.message !== 'Список улюблених міст порожній'
    ) {
      setIsModalOpen(true);
    }
  }, [errorMessageFavorites]);

  const handleToggleFavorite = () => {
    cityExistsInFavorites
      ? handleRemoveFromFavorites()
      : handleAddToFavorites();
  };

  if (isFetching) {
    return (
      <div className='weather-container'>
        <div className='status-container'>
          <SpinerLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='weather-container'>
        <div className='status-container'>
          <ErrorMessageBlock message={error?.message} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='weather-container'>
        <div className='weather-view-toggle'>
          <button
            className={viewMode === 'current-weather' ? 'active' : ''}
            type='button'
            onClick={() => setViewMode('current-weather')}
          >
            На зараз
          </button>

          <button
            className={viewMode === 'forecast' ? 'active' : ''}
            type='button'
            onClick={() => setViewMode('forecast')}
          >
            На тиждень
          </button>

          <button
            className='favorite-button'
            type='button'
            onClick={handleToggleFavorite}
          >
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

        {viewMode === 'forecast' && weeklyForecastData && (
          <WeeklyForecastCard weeklyForecastData={weeklyForecastData} />
        )}
      </div>

      <ModalWindow
        isOpen={isModalOpen}
        message={errorMessageFavorites?.message}
        title={errorMessageFavorites?.title}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default WeatherCard;
