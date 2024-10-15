import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// ==============================================================
import api from '../../api';
// ==============================================================
import CityAutocomplete from '../../components/CityAutocomplete/CityAutocomplete';
import WeatherCard from '../../components/WeatherCard/WeatherCard';

const HomePage = ({ setIsAuthenticated, isAuthenticated }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

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
    <div>
      <h1>Weather App</h1>
      {userProfile && <p>Hi, {userProfile.fullName}!</p>}
      <button onClick={handleLogout}>Logout</button>
      <CityAutocomplete onCitySelect={handleCitySelect} />

      {selectedCity ? (
        <div>
          <WeatherCard
            cityName={selectedCity.name}
            cityState={selectedCity.state}
            cityCountry={selectedCity.country}
          />
        </div>
      ) : (
        <p>Please select a city to view the weather.</p>
      )}
    </div>
  );
};

export default HomePage;
