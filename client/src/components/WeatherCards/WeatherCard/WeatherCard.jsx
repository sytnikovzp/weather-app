import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  faHeartCircleMinus,
  faHeartCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  formatDateTime,
  getWindDirection,
} from '../../../utils/sharedFunctions';
import useCurrentWeatherForCity from '../../../hooks/useCurrentWeatherForCity';
import useFavorites from '../../../hooks/useFavorites';

import { clearFavoritesError } from '../../../store/slices/favoritesSlice';

import ErrorMessageBlock from '../../ErrorMessageBlock/ErrorMessageBlock';
import SpinerLoader from '../../Loaders/SpinerLoader/SpinerLoader';
import ModalWindow from '../../ModalWindow/ModalWindow';
import WeatherDetail from '../WeatherDetail/WeatherDetail';
import WhenUpdated from '../WhenUpdated/WhenUpdated';

import './WeatherCard.css';

function WeatherCard({
  errorMessageUserCity,
  isFetchingUserCity,
  selectedCity,
}) {
  const { city, countryCode, latitude, longitude } = selectedCity;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const {
    currentWeatherData,
    isFetching: isFetchingWeather,
    error: errorMessageWeather,
    onRefresh: onWeatherRefresh,
  } = useCurrentWeatherForCity(latitude, longitude);

  const {
    isCityInFavorites,
    isFetching: isFetchingFavorites,
    error: errorMessageFavorites,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  } = useFavorites(city, countryCode, latitude, longitude);

  const isFetching =
    isFetchingUserCity || isFetchingWeather || isFetchingFavorites;

  const error = errorMessageUserCity || errorMessageWeather;

  useEffect(() => {
    if (errorMessageFavorites) {
      setIsModalOpen(true);
    }
  }, [errorMessageFavorites]);

  const handleToggleFavorite = useCallback(() => {
    isCityInFavorites ? handleRemoveFromFavorites() : handleAddToFavorites();
  }, [isCityInFavorites, handleAddToFavorites, handleRemoveFromFavorites]);

  const handleCloseModal = useCallback(() => {
    dispatch(clearFavoritesError());
    setIsModalOpen(false);
  }, [dispatch]);

  if (!currentWeatherData) {
    return null;
  }

  const {
    main: { temp, feels_like: feelsLike, humidity },
    weather: [{ icon, description }],
    visibility,
    sys: { sunrise, sunset },
    wind: { speed, deg },
    clouds: { all: cloudiness },
  } = currentWeatherData;

  const formattedDescription =
    description.charAt(0).toUpperCase() + description.slice(1);

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
        <div className='card-header'>
          <img
            alt={formattedDescription}
            className='icon'
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          />

          <div>
            <p>
              <strong>Широта:</strong> {latitude}
            </p>
            <p>
              <strong>Довгота:</strong> {longitude}
            </p>
          </div>

          <button
            className='favorite-button'
            type='button'
            onClick={handleToggleFavorite}
          >
            <FontAwesomeIcon
              icon={isCityInFavorites ? faHeartCircleMinus : faHeartCirclePlus}
            />
          </button>
        </div>

        <div className='weather-content'>
          <WhenUpdated
            currentWeatherData={currentWeatherData}
            onWeatherRefresh={onWeatherRefresh}
          />
          <div className='city-info'>
            <h3>{countryCode}</h3>
            <h3>{city}</h3>
            <h3>{Math.round(temp)}°C</h3>
          </div>
          <div className='weather-feels-like'>
            <p>Відчувається як {Math.round(feelsLike)}°C</p>
            <p>{formattedDescription}</p>
          </div>

          <div className='weather-details'>
            <div>
              <WeatherDetail
                label='Видимість:'
                value={`${Math.round(visibility / 1000)} км`}
              />
              <WeatherDetail label='Вологість:' value={`${humidity}%`} />
              <WeatherDetail
                label='Схід сонця:'
                value={formatDateTime(sunrise, 'HH:mm')}
              />
            </div>
            <div>
              <WeatherDetail
                label='Вітер:'
                value={`${Math.round(speed)} м/с ${getWindDirection(deg)}`}
              />
              <WeatherDetail label='Облачність:' value={`${cloudiness}%`} />
              <WeatherDetail
                label='Захід сонця:'
                value={formatDateTime(sunset, 'HH:mm')}
              />
            </div>
          </div>
        </div>
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
