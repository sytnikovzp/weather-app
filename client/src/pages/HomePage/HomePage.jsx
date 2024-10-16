import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// ==============================================================
import api from '../../api';
// ==============================================================
import CityAutocomplete from '../../components/CityAutocomplete/CityAutocomplete';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import TemperatureChart from '../../components/TemperatureChart/TemperatureChart';
import FavoritesList from '../../components/FavoritesList/FavoritesList';
// ==============================================================
import { getWeather } from '../../services/weatherService';
import { getTemperatureData } from '../../services/temperatureService';
// ==============================================================
import weatherLogo from '../../assets/openweather.svg';
import './HomePage.css';

const HomePage = ({ setIsAuthenticated, isAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('main');
  const [userProfile, setUserProfile] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [temperatureData, setTemperatureData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    try {
      await api.get('/auth/logout');
      localStorage.removeItem('accessToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleAddToFavorites = () => {
    if (
      selectedCity &&
      !favorites.some((fav) => fav.name === selectedCity.name)
    ) {
      setFavorites([...favorites, selectedCity]);
    }
  };

  const handleRemoveFromFavorites = (cityName) => {
    setFavorites(favorites.filter((fav) => fav.name !== cityName));
  };

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(city.name);
      setWeatherData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTemperatureData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTemperatureData(city.name);
      setTemperatureData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { replace: true });
    } else {
      const fetchUserProfile = async () => {
        try {
          const response = await api.get('/auth/profile');
          setUserProfile(response.data);
        } catch (error) {
          console.log('Error fetching user profile:', error);
        }
      };
      fetchUserProfile();
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity);
      fetchTemperatureData(selectedCity);
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
              >
                В обране
              </button>
            </div>
            {selectedCity ? (
              <>
                <WeatherCard
                  cityName={selectedCity.name}
                  cityCountry={selectedCity.country}
                  weatherData={weatherData}
                  loading={loading}
                  error={error}
                  onRefresh={() => fetchWeatherData(selectedCity)}
                />

                <TemperatureChart
                  cityName={selectedCity.name}
                  data={temperatureData}
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
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
