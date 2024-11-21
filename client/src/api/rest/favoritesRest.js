import api from '../interceptor';

const fetchFavoriteCities = async () => {
  const response = await api.get('/favorites');
  return response.data;
};

const addCityToFavorites = async (cityName, country, latitude, longitude) => {
  const response = await api.post('/favorites', {
    cityName,
    country,
    latitude,
    longitude,
  });
  return response.data;
};

const removeCityFromFavorites = async (latitude, longitude) => {
  const response = await api.delete('/favorites', {
    params: {
      latitude,
      longitude,
    },
  });
  return response.data;
};

export default {
  fetchFavoriteCities,
  addCityToFavorites,
  removeCityFromFavorites,
};
