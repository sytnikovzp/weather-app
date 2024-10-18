import WeatherCard from '../WeatherCard/WeatherCard';
// ==============================================================
import './FavoritesList.css';

const FavoritesList = ({
  favorites,
  onRemoveFavorite,
  onRefresh,
  isFavorite,
  onCityClick,
  loading,
  error,
}) => {
  return (
    <div className='favorites-list'>
      <h3>Обрані міста</h3>
      {favorites.length === 0 ? (
        <p id='info'>Немає обраних міст.</p>
      ) : (
        <div className='favorites-container'>
          {favorites.map((city) => (
            <div
              key={city.openWeatherId}
              className='favorite-card'
              onClick={() => onCityClick(city)}
            >
              <WeatherCard
                cityName={city.cityName}
                cityCountry={city.country}
                weatherData={city.weather}
                fiveDayData={city.fiveDayWeather}
                isFavorite={isFavorite}
                onRefresh={onRefresh}
                loading={loading}
                error={error}
              />
              <button
                className='remove-favorite-button'
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite(city.openWeatherId);
                }}
              >
                Видалити
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
