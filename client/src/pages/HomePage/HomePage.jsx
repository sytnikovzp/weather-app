import { useCallback, useEffect, useState } from 'react';

import {
  formatWeeklyData,
  processTemperatureData,
  processWeeklyTemperatureData,
} from '../../utils/sharedFunctions';

import {
  favoritesService,
  locationService,
  weatherService,
} from '../../services';

import CityAutocomplete from '../../components/CityAutocomplete/CityAutocomplete';
import FavoritesList from '../../components/FavoritesList/FavoritesList';
import Footer from '../../components/Footer/Footer';
import Logo from '../../components/Logo/Logo';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import TemperatureChart from '../../components/TemperatureChart/TemperatureChart';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import Welcome from '../../components/Welcome/Welcome';

import './HomePage.css';

function HomePage({ setIsAuthenticated, userProfile }) {
  const [activeTab, setActiveTab] = useState('main');
  const [selectedCity, setSelectedCity] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [temperatureData, setTemperatureData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCitySelect = (city) => {
    setSelectedCity({
      cityName: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
    });
  };

  const fetchWeatherData = useCallback(async (selectedCity) => {
    if (!selectedCity.lat || !selectedCity.lon) {
      return { error: 'Координати недоступні' };
    }
    try {
      const currentWeather = await weatherService.getWeather(
        selectedCity.lat,
        selectedCity.lon
      );
      const weeklyWeather = await weatherService.getForecast(
        selectedCity.lat,
        selectedCity.lon
      );
      const formattedWeeklyData = formatWeeklyData(weeklyWeather);
      return { currentWeather, weeklyWeather: formattedWeeklyData };
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }, []);

  const fetchTemperatureData = async (selectedCity) => {
    const data = await weatherService.getForecast(
      selectedCity.lat,
      selectedCity.lon
    );
    const dayData = processTemperatureData(data);
    const weeklyData = processWeeklyTemperatureData(data);
    return { dayData, weeklyData };
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const { currentWeather, weeklyWeather } =
        await fetchWeatherData(selectedCity);
      const { dayData, weeklyData } = await fetchTemperatureData(selectedCity);
      setWeatherData(currentWeather);
      setWeeklyData(weeklyWeather);
      setTemperatureData({ dayData, weeklyData });
    } catch (error) {
      setErrorMessage(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setActiveTab('main');
  };

  const fetchFavorites = useCallback(async () => {
    try {
      const favoriteCities = await favoritesService.getAllFavorites();
      const favoritesWithWeather = await Promise.all(
        favoriteCities.map(async (city) => {
          const { currentWeather, weeklyWeather } =
            await fetchWeatherData(city);
          return { ...city, weather: currentWeather, weeklyWeather };
        })
      );
      setFavorites(favoritesWithWeather);
    } catch (error) {
      console.error(error.message);
    }
  }, [fetchWeatherData]);

  const fetchWeatherForUserLocation = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const { latitude, longitude } = await locationService.getLocationByIP();
      const weather = await weatherService.getWeather(latitude, longitude);
      setWeatherData(weather);
      setSelectedCity({
        cityName: weather.name,
        country: weather.sys.country,
        lat: latitude,
        lon: longitude,
      });
    } catch (error) {
      setErrorMessage(error.response?.data?.message);
    } finally {
      setIsLoading(false);
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
    }
  }, [selectedCity, favorites]);

  useEffect(() => {
    if (selectedCity) {
      const getWeather = async () => {
        setIsLoading(true);
        setErrorMessage('');
        try {
          const { currentWeather, weeklyWeather } =
            await fetchWeatherData(selectedCity);
          const { dayData, weeklyData } =
            await fetchTemperatureData(selectedCity);
          setWeatherData(currentWeather);
          setWeeklyData(weeklyWeather);
          setTemperatureData({ dayData, weeklyData });
        } catch (error) {
          setErrorMessage(error.response?.data?.message);
        } finally {
          setIsLoading(false);
        }
      };
      getWeather();
    }
  }, [fetchWeatherData, selectedCity]);

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
        <Welcome
          setIsAuthenticated={setIsAuthenticated}
          userProfile={userProfile}
        />
      </div>
      {activeTab === 'main' ? (
        <div className='content'>
          <CityAutocomplete onCitySelect={handleCitySelect} />

          {selectedCity && (
            <>
              <WeatherCard
                cityCountry={selectedCity.country}
                cityName={selectedCity.cityName}
                errorMessage={errorMessage}
                favorites={favorites}
                fetchFavorites={fetchFavorites}
                isFavorite={isFavorite}
                isLoading={isLoading}
                latitude={selectedCity.lat}
                longitude={selectedCity.lon}
                setIsModalOpen={setIsModalOpen}
                weatherData={weatherData}
                weeklyData={weeklyData}
                onRefresh={handleRefresh}
              />

              <TemperatureChart
                cityName={selectedCity.cityName}
                dayData={temperatureData?.dayData}
                weeklyData={temperatureData?.weeklyData}
              />
            </>
          )}
        </div>
      ) : (
        <div className='content'>
          <FavoritesList
            errorMessage={errorMessage}
            favorites={favorites}
            isFavorite={isFavorite}
            isLoading={isLoading}
            onRefresh={handleRefresh}
            onSelectClick={handleSelectCity}
          />
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
