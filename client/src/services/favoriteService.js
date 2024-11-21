import api from '../api/interceptor';

const getFavoriteCities = async () => {
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
  getFavoriteCities,
  addCityToFavorites,
  removeCityFromFavorites,
};
