import { useCallback } from 'react';

import {
  faHeartCircleMinus,
  faHeartCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useFavorites from '../../../hooks/useFavorites';

import ErrorMessageBlock from '../../ErrorMessageBlock/ErrorMessageBlock';

import './FavoriteWeatherCard.css';

function FavoriteWeatherCard({ selectedCity, onSelect }) {
  const { city, countryCode, latitude, longitude } = selectedCity;

  const {
    isCityInFavorites,
    error,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  } = useFavorites(city, countryCode, latitude, longitude);

  const handleToggleFavorite = useCallback(
    (event) => {
      event.stopPropagation();
      isCityInFavorites ? handleRemoveFromFavorites() : handleAddToFavorites();
    },
    [isCityInFavorites, handleAddToFavorites, handleRemoveFromFavorites]
  );

  const handleClick = useCallback(() => {
    onSelect(selectedCity);
  }, [selectedCity, onSelect]);

  if (error) {
    return (
      <div className='favorite-weather-card'>
        <div className='status-container'>
          <ErrorMessageBlock message={error?.message} />
        </div>
      </div>
    );
  }

  return (
    <div className='favorite-weather-card' onClick={handleClick}>
      <div className='card-header'>
        <h3>{countryCode}</h3>
        <h3>{city}</h3>
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

      <p>
        <strong>Широта:</strong> {latitude}
      </p>

      <p>
        <strong>Довгота:</strong> {longitude}
      </p>
    </div>
  );
}

export default FavoriteWeatherCard;
