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
import weatherLogo from '../../assets/openweather.svg';
import './HomePage.css';

const HomePage = ({ setIsAuthenticated, isAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('main');
  const [userProfile, setUserProfile] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
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
          {userProfile && <p>Привіт, {userProfile.fullName}!</p>}
          <button id='logout' onClick={handleLogout}>
            Вихід
          </button>
        </div>
      </div>

      <div className='weather-container'>
        {activeTab === 'main' ? (
          <div className='main-content'>
            <CityAutocomplete onCitySelect={handleCitySelect} />
            {selectedCity ? (
              <>
                <div>
                  <WeatherCard
                    cityName={selectedCity.name}
                    cityCountry={selectedCity.country}
                  />

                  <TemperatureChart cityName={selectedCity.name} />
                </div>
              </>
            ) : (
              <p>Виберіть місто, щоб переглянути погоду.</p>
            )}
          </div>
        ) : (
          <div className='favorites-content'>{<FavoritesList />}</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
