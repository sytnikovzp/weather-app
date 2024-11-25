import { useEffect, useState, useCallback } from 'react';
// ==============================================================
import { MAX_FAVORITES } from '../../constants';
// ==============================================================
import restController from '../../api/rest/restController';
import {
  formatFiveDayData,
  processFiveDayTemperatureData,
  processTemperatureData,
} from '../../utils/sharedFunctions';
// ==============================================================
import CityAutocomplete from '../../components/CityAutocomplete/CityAutocomplete';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import TemperatureChart from '../../components/TemperatureChart/TemperatureChart';
import FavoritesList from '../../components/FavoritesList/FavoritesList';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
// ==============================================================
import weatherLogo from '../../assets/openweather.svg';
import './HomePage.css';

function HomePage({ setIsAuthenticated, userProfile }) {
  const [activeTab, setActiveTab] = useState('main');
  const [selectedCity, setSelectedCity] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [fiveDayData, setFiveDayData] = useState(null);
  const [temperatureData, setTemperatureData] = useState(null);
  const [isFavButtonEnabled, setIsFavButtonEnabled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    try {
      await restController.logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Помилка виходу із системи:', error.message);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity({
      cityName: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
    });
  };

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const { currentWeather, fiveDayWeather } = await fetchWeatherData(
        selectedCity
      );
      const { dayData, fiveDayData } = await fetchTemperatureData(selectedCity);
      setWeatherData(currentWeather);
      setFiveDayData(fiveDayWeather);
      setTemperatureData({ dayData, fiveDayData });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = async () => {
    if (favorites.length >= MAX_FAVORITES) {
      setIsModalOpen(true);
      return;
    }
    if (!selectedCity || !weatherData?.sys) {
      console.error('Недійсні дані про місто або дані про погоду недоступні');
      return;
    }
    const { cityName, lat, lon } = selectedCity;
    const { country } = weatherData.sys;
    if (favorites.some((fav) => fav.lat === lat && fav.lon === lon)) return;
    try {
      await restController.addCityToFavorites(cityName, country, lat, lon);
      const { currentWeather, fiveDayWeather } = await fetchWeatherData(
        selectedCity
      );
      setFavorites([
        ...favorites,
        {
          cityName,
          country,
          lat,
          lon,
          weather: currentWeather,
          fiveDayWeather,
        },
      ]);
      setIsFavButtonEnabled(false);
    } catch (error) {
      console.error('Помилка додавання до обраного:', error.message);
    }
  };

  const handleRemoveFromFavorites = async (latitude, longitude) => {
    try {
      await restController.removeCityFromFavorites(latitude, longitude);
      setFavorites(
        favorites.filter((fav) => fav.lat !== latitude && fav.lon !== longitude)
      );
    } catch (error) {
      console.error('Помилка видалення з обраного:', error.message);
    }
  };

  const handleFavoriteClick = (city) => {
    setSelectedCity(city);
    setActiveTab('main');
  };

  const fetchWeatherData = useCallback(async (selectedCity) => {
    if (!selectedCity.lat || !selectedCity.lon) {
      return { error: 'Координати недоступні' };
    }
    try {
      const currentWeather = await restController.fetchWeather(
        selectedCity.lat,
        selectedCity.lon
      );
      const fiveDayWeather = await restController.fetchForecast(
        selectedCity.lat,
        selectedCity.lon
      );
      const formattedFiveDayData = formatFiveDayData(fiveDayWeather);
      return { currentWeather, fiveDayWeather: formattedFiveDayData };
    } catch (error) {
      console.error('Помилка отримання даних про погоду:', error.message);
      throw error;
    }
  }, []);

  const fetchTemperatureData = async (selectedCity) => {
    const data = await restController.fetchForecast(
      selectedCity.lat,
      selectedCity.lon
    );
    const dayData = processTemperatureData(data);
    const fiveDayData = processFiveDayTemperatureData(data);
    return { dayData, fiveDayData };
  };

  const fetchFavorites = useCallback(async () => {
    try {
      const favoriteCities = await restController.fetchFavoriteCities();
      const favoritesWithWeather = await Promise.all(
        favoriteCities.map(async (city) => {
          const { currentWeather, fiveDayWeather } = await fetchWeatherData(
            city
          );
          return { ...city, weather: currentWeather, fiveDayWeather };
        })
      );
      setFavorites(favoritesWithWeather);
    } catch (error) {
      console.error('Помилка завантаження списку обраних міст:', error.message);
    }
  }, [fetchWeatherData]);

  const fetchWeatherForUserLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const { latitude, longitude } = await restController.fetchLocationByIP();
      const weather = await restController.fetchWeather(latitude, longitude);
      setWeatherData(weather);
      setSelectedCity({
        cityName: weather.name,
        country: weather.sys.country,
        lat: latitude,
        lon: longitude,
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
    fetchWeatherForUserLocation();
  }, [fetchFavorites]);

  useEffect(() => {
    if (selectedCity) {
      const cityExistsInFavorites = favorites.some(
        (fav) => fav.cityName === selectedCity.cityName
      );
      setIsFavorite(cityExistsInFavorites);
      setIsFavButtonEnabled(!cityExistsInFavorites);
    } else {
      setIsFavButtonEnabled(false);
    }
  }, [selectedCity, favorites]);

  useEffect(() => {
    if (selectedCity) {
      const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        try {
          const { currentWeather, fiveDayWeather } = await fetchWeatherData(
            selectedCity
          );
          const { dayData, fiveDayData } = await fetchTemperatureData(
            selectedCity
          );
          setWeatherData(currentWeather);
          setFiveDayData(fiveDayWeather);
          setTemperatureData({ dayData, fiveDayData });
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchWeather();
    }
  }, [fetchWeatherData, selectedCity]);

  return (
    <div className='app-container'>
      <div className='logo-container'>
        <img src={weatherLogo} className='logo' alt='Weather logo' />
      </div>
      <div className='tabs-wrapper'>
        <div className='tabs-container'>
          <div
            className={`tab ${activeTab === 'main' ? 'active' : ''}`}
            onClick={() => handleTabClick('main')}
          >
            Головна
          </div>
          <div
            className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => handleTabClick('favorites')}
          >
            Обране
          </div>
        </div>
        <div className='user-container'>
          {userProfile && <p id='welcome'>Привіт, {userProfile.fullName}!</p>}
          <button id='logout' onClick={handleLogout}>
            Вихід
          </button>
        </div>
      </div>
      <div className='weather-container'>
        {activeTab === 'main' ? (
          <div className='main-content'>
            <div className='autocomplete-header'>
              <CityAutocomplete onCitySelect={handleCitySelect} />
              <button
                className='favorite-button'
                onClick={handleAddToFavorites}
                disabled={!isFavButtonEnabled}
              >
                В обране
              </button>
            </div>
            {selectedCity ? (
              <>
                <WeatherCard
                  cityName={selectedCity.cityName}
                  cityCountry={selectedCity.country}
                  weatherData={weatherData}
                  fiveDayData={fiveDayData}
                  onRefresh={handleRefresh}
                  isFavorite={isFavorite}
                  loading={loading}
                  error={error}
                />
                <TemperatureChart
                  cityName={selectedCity.cityName}
                  dayData={temperatureData?.dayData}
                  fiveDayData={temperatureData?.fiveDayData}
                  loading={loading}
                  error={error}
                />
              </>
            ) : (
              <p id='info'>Для перегляду погоди треба обрати місто</p>
            )}
          </div>
        ) : (
          <div className='favorites-content'>
            <FavoritesList
              favorites={favorites}
              onRefresh={handleRefresh}
              isFavorite={isFavorite}
              onRemoveFavorite={handleRemoveFromFavorites}
              onCityClick={handleFavoriteClick}
              loading={loading}
              error={error}
            />
          </div>
        )}
      </div>

      <ModalWindow
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Максимум обраних міст'
        message='Для додавання нового видаліть існуюче місто з обраних. Максимум 5.'
      />
    </div>
  );
}

export default HomePage;
