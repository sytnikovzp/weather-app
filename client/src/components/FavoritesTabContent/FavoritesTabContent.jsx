import { useSelector } from 'react-redux';

import { selectFavorites } from '../../store/selectors/favoritesSelectors';

import WeatherCard from '../WeatherCard/WeatherCard';

function FavoritesTabContent({ onCitySelect }) {
  const favorites = useSelector(selectFavorites);

  return (
    <div className='content'>
      <h3>Список обраних міст</h3>
      {favorites.length === 0 ? (
        <p>Немає обраних міст</p>
      ) : (
        <>
          {favorites.map((city) => (
            <div
              key={city.weather.sys.sunrise}
              onClick={() => onCitySelect(city)}
            >
              <WeatherCard
              // selectedCity={selectedCity}
              // setIsModalOpen={setIsModalOpen}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default FavoritesTabContent;
