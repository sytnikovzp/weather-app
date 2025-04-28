import {
  faHeartCircleMinus,
  faHeartCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useFavorites from '../../hooks/useFavorites';

import ErrorMessageBlock from '../ErrorMessageBlock/ErrorMessageBlock';
import SpinerLoader from '../SpinerLoader/SpinerLoader';

import './WeatherSmallCard.css';

function WeatherSmallCard({ selectedCity, onClick }) {
  const { city, country, latitude, longitude } = selectedCity;

  const {
    cityExistsInFavorites,
    isFetching,
    errorMessage,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  } = useFavorites(city, country, latitude, longitude);

  const handleToggleFavorite = (event) => {
    event.stopPropagation();
    cityExistsInFavorites
      ? handleRemoveFromFavorites()
      : handleAddToFavorites();
  };

  if (isFetching) {
    return (
      <div className='weather-small-card'>
        <div className='status-container'>
          <SpinerLoader />
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className='weather-small-card'>
        <div className='status-container'>
          <ErrorMessageBlock message={errorMessage} />
        </div>
      </div>
    );
  }

  return (
    <div className='weather-small-card' onClick={onClick}>
      <div className='city-name'>
        <h3>{country}</h3>
        <h3>{city}</h3>
        <button className='favorite-button' onClick={handleToggleFavorite}>
          <FontAwesomeIcon
            icon={
              cityExistsInFavorites ? faHeartCircleMinus : faHeartCirclePlus
            }
          />
        </button>
      </div>

      <p>
        <strong>Latitude:</strong> {latitude}
      </p>

      <p>
        <strong>Longitude:</strong> {longitude}
      </p>
    </div>
  );
}

export default WeatherSmallCard;
