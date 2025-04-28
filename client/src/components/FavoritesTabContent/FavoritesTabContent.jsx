import useFavorites from '../../hooks/useFavorites';

import WeatherSmallCard from '../WeatherSmallCard/WeatherSmallCard';

import './FavoritesTabContent.css';

function FavoritesTabContent({ onCitySelect }) {
  const { favorites, errorMessage } = useFavorites();

  return (
    <div className='content'>
      <div className='title-container'>
        <h3>Список обраних міст</h3>
      </div>

      {favorites.length === 0 ? (
        <div className='status-container'>
          <p>{errorMessage?.message}</p>
        </div>
      ) : (
        favorites.map((city) => (
          <WeatherSmallCard
            key={`${city.latitude}-${city.longitude}`}
            selectedCity={city}
            onClick={() => onCitySelect(city)}
          />
        ))
      )}
    </div>
  );
}

export default FavoritesTabContent;
