import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// ==============================================================
import {
  fetchUserProfile,
  logout,
  addCityToFavorites,
  removeCityFromFavorites,
} from '../../api';
// ==============================================================
import CityAutocomplete from '../../components/CityAutocomplete/CityAutocomplete';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import TemperatureChart from '../../components/TemperatureChart/TemperatureChart';
import FavoritesList from '../../components/FavoritesList/FavoritesList';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
// ==============================================================
import {
  fetchFavorites,
  fetchWeatherData,
} from '../../services/weatherService';
import { fetchTemperatureData } from '../../services/temperatureService';
// ==============================================================
import weatherLogo from '../../assets/openweather.svg';
import './HomePage.css';

const HomePage = ({ setIsAuthenticated, isAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('main');
  const [userProfile, setUserProfile] = useState(null);
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

  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Logout error:', error);
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

  const handleAddToFavorites = async () => {
    if (favorites.length >= 5) {
      setIsModalOpen(true);
      return;
    }

    if (
      selectedCity &&
      !favorites.some((fav) => fav.cityName === selectedCity.cityName)
    ) {
      const openWeatherId = weatherData.id;
      const cityName = weatherData.name;
      const country = weatherData.sys.country;
      try {
        const response = await addCityToFavorites(
          openWeatherId,
          cityName,
          country
        );
        setFavorites([...favorites, response.data]);
        setIsFavButtonEnabled(false);
      } catch (error) {
        console.log('Error adding to favorites:', error);
      }
    }
  };

  const handleRemoveFromFavorites = async (openWeatherId) => {
    try {
      await removeCityFromFavorites(openWeatherId);
      setFavorites(
        favorites.filter((fav) => fav.openWeatherId !== openWeatherId)
      );
    } catch (error) {
      console.log('Error removing from favorites:', error);
    }
  };

  const handleFavoriteClick = (city) => {
    setSelectedCity(city);
    setActiveTab('main');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { replace: true });
    } else {
      const fetchUserProfileData = async () => {
        try {
          const profileData = await fetchUserProfile();
          setUserProfile(profileData);
          const favoriteCities = await fetchFavorites();
          setFavorites(favoriteCities);
          if (favoriteCities.length > 0) {
            const lastFavorite = favoriteCities[favoriteCities.length - 1];
            setSelectedCity(lastFavorite);
          }
        } catch (error) {
          console.log('Error fetching user profile:', error);
        }
      };
      fetchUserProfileData();
    }
  }, [isAuthenticated, navigate]);

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
  }, [selectedCity]);

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
                  onRefresh={() => fetchWeatherData(selectedCity)}
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
              onRemoveFavorite={handleRemoveFromFavorites}
              onCityClick={handleFavoriteClick}
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
};

export default HomePage;
