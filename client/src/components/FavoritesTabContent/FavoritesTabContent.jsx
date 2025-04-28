import useFavorites from '../../hooks/useFavorites';

import './FavoritesTabContent.css';

function FavoritesTabContent({ onCitySelect }) {
  const { favorites } = useFavorites();

  const handleCitySelect = (city) => {
    onCitySelect(city);
  };

  return (
    <div className='content'>
      <div className='title-container'>
        <h3>Список обраних міст</h3>
      </div>

      {favorites.length === 0 ? (
        <p>Немає обраних міст</p>
      ) : (
        <>
          {favorites.map((city) => (
            <div
              key={`${city.latitude}-${city.longitude}`}
              className='small-card'
              onClick={() => handleCitySelect(city)}
            >
              <p>{`${city.latitude}-${city.longitude}`}</p>
              <p>{city.city}</p>
              <p>{city.country}</p>
              <p>{city.latitude}</p>
              <p>{city.longitude}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default FavoritesTabContent;
