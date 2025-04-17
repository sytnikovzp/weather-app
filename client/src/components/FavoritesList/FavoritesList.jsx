import WeatherCard from '../WeatherCard/WeatherCard';

function FavoritesList({
  favorites,
  onRefresh,
  isFavorite,
  onSelectClick,
  isLoading,
  errorMessage,
}) {
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
                cityCountry={city.country}
                cityName={city.cityName}
                errorMessage={errorMessage}
                isFavorite={isFavorite}
                isLoading={isLoading}
                weatherData={city.weather}
                weeklyData={city.weeklyWeather}
                onRefresh={onRefresh}
              />
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default FavoritesList;
