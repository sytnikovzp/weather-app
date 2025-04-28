import useFavorites from '../../hooks/useFavorites';

import FavoriteWeatherCard from '../WeatherCards/FavoriteWeatherCard/FavoriteWeatherCard';

import './FavoritesTabContent.css';

function FavoritesTabContent({ onCitySelect }) {
  const { favorites, error } = useFavorites();

  return (
    <div className='content'>
      <div className='title-container'>
        <h3>Список обраних міст</h3>
      </div>

      {favorites.length === 0 ? (
        <div className='status-container'>
          <p>{error?.message}</p>
        </div>
      ) : (
        favorites.map((city) => (
          <FavoriteWeatherCard
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
