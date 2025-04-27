import { useEffect, useState } from 'react';

import { locationService, weatherService } from '../../services';

import CityAutocomplete from '../../components/CityAutocomplete/CityAutocomplete';
import FavoritesList from '../../components/FavoritesList/FavoritesList';
import Footer from '../../components/Footer/Footer';
import Logo from '../../components/Logo/Logo';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import TemperatureChart from '../../components/TemperatureChart/TemperatureChart';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import Welcome from '../../components/Welcome/Welcome';

import './HomePage.css';

function HomePage() {
  const [activeTab, setActiveTab] = useState('main');
  const [selectedCity, setSelectedCity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCitySelect = (city) => {
    setSelectedCity({
      city: city.name,
      country: city.country,
      latitude: city.lat,
      longitude: city.lon,
    });
    setActiveTab('main');
  };

  const fetchWeatherForUserLocation = async () => {
    const { latitude, longitude } = await locationService.getLocationByIP();
    const weather = await weatherService.getWeather(latitude, longitude);
    setSelectedCity({
      city: weather.name,
      country: weather.sys.country,
      latitude,
      longitude,
    });
  };

  useEffect(() => {
    fetchWeatherForUserLocation();
  }, []);

  return (
    <div id='app-container'>
      <Logo />
      <div id='header'>
        <div id='tabs-container'>
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

          {selectedCity && (
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
