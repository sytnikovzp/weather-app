import api from '../api';

const getFavoriteCities = async () => {
  const { data } = await api.get('/favorites');
  return data;
};

const addCityToFavorites = async (cityName, country, latitude, longitude) => {
  const { data } = await api.post('/favorites', {
    cityName,
    country,
    latitude,
    longitude,
  });
  return data;
};

const removeCityFromFavorites = async (latitude, longitude) => {
  const { data } = await api.delete('/favorites', {
    params: {
      latitude,
      longitude,
    },
  });
  return data;
};

export default {
  getFavoriteCities,
  addCityToFavorites,
  removeCityFromFavorites,
};
