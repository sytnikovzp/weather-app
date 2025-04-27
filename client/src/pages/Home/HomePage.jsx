import { useCallback, useEffect, useState } from 'react';

import useUserLocationWeather from '../../hooks/useUserLocationWeather';

import CityAutocomplete from '../../components/CityAutocomplete/CityAutocomplete';
import ErrorMessageBlock from '../../components/ErrorMessageBlock/ErrorMessageBlock';
import FavoritesList from '../../components/FavoritesList/FavoritesList';
import Footer from '../../components/Footer/Footer';
import Logo from '../../components/Logo/Logo';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import SpinerLoader from '../../components/SpinerLoader/SpinerLoader';
import TemperatureChart from '../../components/TemperatureChart/TemperatureChart';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import Welcome from '../../components/Welcome/Welcome';

import './HomePage.css';

function HomePage() {
  const [activeTab, setActiveTab] = useState('main');
  const [selectedCity, setSelectedCity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userCity, isLoading, errorMessage } = useUserLocationWeather();

  const isCitySelected = Boolean(selectedCity);

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
      <div className='header'>
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
        <Welcome />
      </div>
      {activeTab === 'main' ? (
        <div className='content'>
          <CityAutocomplete onCitySelect={handleCitySelect} />
          {isLoading && <SpinerLoader />}

          {errorMessage && (
            <div className='error-big-container'>
              <ErrorMessageBlock message={errorMessage} />
            </div>
          )}

          {isCitySelected && !isLoading && !errorMessage && (
            <>
              <WeatherCard
                selectedCity={selectedCity}
                setIsModalOpen={setIsModalOpen}
              />
              <TemperatureChart selectedCity={selectedCity} />
            </>
          )}
        </div>
      ) : (
        <div className='content'>
          <FavoritesList onSelectClick={handleCitySelect} />
        </div>
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
