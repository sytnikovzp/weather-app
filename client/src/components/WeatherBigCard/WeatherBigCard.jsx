import { useEffect, useState } from 'react';
import {
  faHeartCircleMinus,
  faHeartCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useFavorites from '../../hooks/useFavorites';
import useWeatherForCity from '../../hooks/useWeatherForCity';

import CurrentWeatherCard from '../CurrentWeatherCard/CurrentWeatherCard';
import ErrorMessageBlock from '../ErrorMessageBlock/ErrorMessageBlock';
import ModalWindow from '../ModalWindow/ModalWindow';
import SpinerLoader from '../SpinerLoader/SpinerLoader';
import WeeklyForecastCard from '../WeeklyForecastCard/WeeklyForecastCard';

import './WeatherBigCard.css';

function WeatherBigCard({
  errorMessageUserCity,
  isFetchingUserCity,
  selectedCity,
}) {
  const [viewMode, setViewMode] = useState('current-weather');
  const { city, country, latitude, longitude } = selectedCity;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    currentWeatherData,
    weeklyWeatherData,
    isFetching: isFetchingWeather,
    errorMessage: errorMessageWeather,
    onRefresh,
  } = useWeatherForCity(latitude, longitude);

  const {
    cityExistsInFavorites,
    isFetching: isFetchingFavorites,
    errorMessage: errorMessageFavorites,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  } = useFavorites(city, country, latitude, longitude);

  const isFetching =
    isFetchingUserCity || isFetchingWeather || isFetchingFavorites;
  const errorMessage = errorMessageUserCity || errorMessageWeather;

  useEffect(() => {
    if (errorMessageFavorites) {
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
      <div className='weather-big-card'>
        <div className='status-container'>
          <SpinerLoader />
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className='weather-big-card'>
        <div className='status-container'>
          <ErrorMessageBlock message={errorMessageUserCity} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='weather-big-card'>
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

        {viewMode === 'forecast' && weeklyWeatherData && (
          <WeeklyForecastCard weeklyWeatherData={weeklyWeatherData} />
        )}
      </div>

      <ModalWindow
        isOpen={isModalOpen}
        message={errorMessageFavorites?.message}
        title={errorMessageFavorites?.title}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default WeatherBigCard;
