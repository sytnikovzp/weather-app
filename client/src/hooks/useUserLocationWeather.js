import { useEffect, useState } from 'react';

import { locationService, weatherService } from '../services';

function useUserLocationWeather() {
  const [userCity, setUserCity] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchWeatherForUserLocation = async () => {
    try {
      setIsFetching(true);
      setErrorMessage('');
      const { latitude, longitude } = await locationService.getLocationByIP();
      const currentWeatherData = await weatherService.getWeather(
        latitude,
        longitude
      );

      setUserCity({
        city: currentWeatherData.name,
        country: currentWeatherData.sys.country,
        latitude,
        longitude,
      });
    } catch (error) {
      setErrorMessage(error.response?.data?.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchWeatherForUserLocation();
  }, []);

  return { userCity, isFetching, errorMessage };
}

export default useUserLocationWeather;
