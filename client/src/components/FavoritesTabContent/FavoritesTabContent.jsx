import useFavorites from '../../hooks/useFavorites';

import ErrorMessageBlock from '../ErrorMessageBlock/ErrorMessageBlock';
import FavoriteWeatherCard from '../WeatherCards/FavoriteWeatherCard/FavoriteWeatherCard';

import './FavoritesTabContent.css';

function FavoritesTabContent({ onCitySelect }) {
  const { favorites } = useFavorites();

  return (
    <div className='content'>
      <div className='title-container'>
        <h3>Список обраних міст</h3>
      </div>

      {favorites.length === 0 ? (
        <div className='status-container'>
          <ErrorMessageBlock message={'Список улюблених міст порожній'} />
        </div>
      ) : (
        favorites.map((city) => (
          <FavoriteWeatherCard
            key={`${city.latitude}-${city.longitude}`}
            selectedCity={city}
            onSelect={onCitySelect}
          />
        ))
      )}
    </div>
  );
}

export default FavoritesTabContent;
