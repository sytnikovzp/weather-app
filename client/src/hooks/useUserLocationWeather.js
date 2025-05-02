/* eslint-disable camelcase */
import { useEffect, useState } from 'react';

import { locationService } from '../services';

function useUserLocationWeather() {
  const [userCity, setUserCity] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchWeatherForUserLocation = async () => {
    try {
      setIsFetching(true);

      setErrorMessage('');
      const { city, country_code, latitude, longitude } =
        await locationService.getLocationByIP();

      setUserCity({
        city,
        country: country_code,
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
