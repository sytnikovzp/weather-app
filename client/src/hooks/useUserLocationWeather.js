import { useEffect, useState } from 'react';

import { locationService, weatherService } from '../services';

function useUserLocationWeather() {
  const [userCity, setUserCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchWeatherForUserLocation = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');
        const { latitude, longitude } = await locationService.getLocationByIP();
        const currentWeather = await weatherService.getWeather(
          latitude,
          longitude
        );
        setUserCity({
          city: currentWeather.name,
          country: currentWeather.sys.country,
          latitude,
          longitude,
        });
      } catch (error) {
        console.log('error', error);

        setErrorMessage(error.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherForUserLocation();
  }, []);

  return { userCity, isLoading, errorMessage };
}

export default useUserLocationWeather;
