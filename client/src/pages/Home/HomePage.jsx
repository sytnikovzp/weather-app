import { useCallback, useEffect, useState } from 'react';

import useUserLocationWeather from '../../hooks/useUserLocationWeather';

import FavoritesTabContent from '../../components/FavoritesTabContent/FavoritesTabContent';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Logo from '../../components/Logo/Logo';
import MainTabContent from '../../components/MainTabContent/MainTabContent';
import ModalWindow from '../../components/ModalWindow/ModalWindow';

import './HomePage.css';

function HomePage() {
  const [activeTab, setActiveTab] = useState('main');
  const [selectedCity, setSelectedCity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userCity, isLoading, errorMessage } = useUserLocationWeather();

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const handleCitySelect = useCallback((city) => {
    setSelectedCity({
      city: city.name,
      country: city.country,
      latitude: city.lat,
      longitude: city.lon,
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
          isLoadingUserCity={isLoading}
          selectedCity={selectedCity}
          setIsModalOpen={setIsModalOpen}
          onCitySelect={handleCitySelect}
        />
      ) : (
        <FavoritesTabContent onCitySelect={handleCitySelect} />
      )}

      <Footer />

      <ModalWindow
        isOpen={isModalOpen}
        message='Щоб зберегти нове місто, спершу видаліть одне з наявних (максимум — 5).'
        title='Увага'
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default HomePage;
