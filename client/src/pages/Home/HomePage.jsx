import { useCallback, useEffect, useState } from 'react';

import useUserLocationWeather from '../../hooks/useUserLocationWeather';

import FavoritesTabContent from '../../components/FavoritesTabContent/FavoritesTabContent';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Logo from '../../components/Logo/Logo';
import MainTabContent from '../../components/MainTabContent/MainTabContent';

import './HomePage.css';

function HomePage() {
  const [activeTab, setActiveTab] = useState('main');
  const [selectedCity, setSelectedCity] = useState(null);
  const { userCity, isFetching, errorMessage } = useUserLocationWeather();

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const handleCitySelect = useCallback((city) => {
    setSelectedCity({
      city: city.name || city.city,
      countryCode: city.countryCode || city.country,
      latitude: city.latitude ?? city.lat,
      longitude: city.longitude ?? city.lon,
    });
    setActiveTab('main');
  }, []);

  useEffect(() => {
    if (userCity) {
      setSelectedCity(userCity);
    }
  }, [userCity]);

  return (
    <div className='app-container'>
      <Logo />
      <Header activeTab={activeTab} onTabClick={handleTabClick} />
      {activeTab === 'main' ? (
        <MainTabContent
          errorMessageUserCity={errorMessage}
          isFetchingUserCity={isFetching}
          selectedCity={selectedCity}
          onCitySelect={handleCitySelect}
        />
      ) : (
        <FavoritesTabContent onCitySelect={handleCitySelect} />
      )}
      <Footer />
    </div>
  );
}

export default HomePage;
