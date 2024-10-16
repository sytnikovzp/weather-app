import './FavoritesList.css';

const FavoritesList = ({ favorites, onRemoveFavorite }) => {
  return (
    <div className='favorites-list'>
      <h3>Обрані міста</h3>
      {favorites.length === 0 ? (
        <p id='info'>Немає обраних міст.</p>
      ) : (
        <ul>
          {favorites.map((city) => (
            <li key={city.name}>
              {city.name}, {city.country}
              <button
                className='remove-favorite-button'
                onClick={() => onRemoveFavorite(city.name)}
              >
                Видалити
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
