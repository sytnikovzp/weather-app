import api from '../api';

const getAllFavorites = async () => {
  const response = await api.get('/favorites');
  return response;
};

const addCityToFavorites = async (city, countryCode, latitude, longitude) => {
  const response = await api.post('/favorites', {
    city,
    countryCode,
    latitude,
    longitude,
  });

  return response;
};

const removeCityFromFavorites = async (latitude, longitude) => {
  const response = await api.delete('/favorites', {
    params: {
      latitude,
      longitude,
    },
  });

  return response;
};

export { addCityToFavorites, getAllFavorites, removeCityFromFavorites };
