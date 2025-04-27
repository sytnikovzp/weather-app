import { useSelector } from 'react-redux';

import { selectFavorites } from '../../store/selectors/favoritesSelectors';

import WeatherCard from '../WeatherCard/WeatherCard';

function FavoritesList({ onSelectClick }) {
  const favorites = useSelector(selectFavorites);

  return (
    <>
      <h3>Список обраних міст</h3>
      {favorites.length === 0 ? (
        <p>Немає обраних міст</p>
      ) : (
        <>
          {favorites.map((city) => (
            <div
              key={city.weather.sys.sunrise}
              onClick={() => onSelectClick(city)}
            >
              <WeatherCard
              // city={selectedCity}
              // setIsModalOpen={setIsModalOpen}
              />
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default FavoritesList;
