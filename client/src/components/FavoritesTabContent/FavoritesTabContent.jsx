import { useSelector } from 'react-redux';

import { selectFavorites } from '../../store/selectors/favoritesSelectors';

import WeatherCard from '../WeatherCard/WeatherCard';

import './FavoritesTabContent.css';

function FavoritesTabContent({ onCitySelect }) {
  const favorites = useSelector(selectFavorites);

  return (
    <div className='content'>
      <div className='title-container'>
        <h3>Список обраних міст</h3>
      </div>

      <div className='small-card' />
      <div className='small-card' />
      <div className='small-card' />
      <div className='small-card' />
      <div className='small-card' />

      {/* {favorites.length === 0 ? (
        <p>Немає обраних міст</p>
      ) : (
        <>
          {favorites.map((city) => (
            <div
              className='small-card'
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
      )} */}
    </div>
  );
}

export default FavoritesTabContent;
