import {
  authService,
  favoriteService,
  locationService,
  userService,
  weatherService,
} from '../../services';

const restController = {
  // Authentication
  registration: (fullName, email, password) =>
    authService.registration(fullName, email, password),
  login: (email, password) => authService.login(email, password),
  refreshAccessToken: (originalRequest) =>
    authService.refreshAccessToken(originalRequest),
  logout: () => authService.logout(),

  // Users
  fetchUserProfile: () => userService.getUserProfile(),
  updateUserData: (userData) => userService.updateUserProfile(userData),
  deleteUserProfile: () => userService.deleteUserProfile(),

  // Favorites
  fetchFavoriteCities: () => favoriteService.getFavoriteCities(),
  addCityToFavorites: (cityName, country, latitude, longitude) =>
    favoriteService.addCityToFavorites(cityName, country, latitude, longitude),
  removeCityFromFavorites: (latitude, longitude) =>
    favoriteService.removeCityFromFavorites(latitude, longitude),

  // Location
  fetchLocationByIP: () => locationService.getLocationByIP(),

  // Weather
  fetchCitySuggestions: (searchTerm) =>
    weatherService.getCitySuggestions(searchTerm),
  fetchWeather: (latitude, longitude) =>
    weatherService.getWeather(latitude, longitude),
  fetchForecast: (latitude, longitude) =>
    weatherService.getForecast(latitude, longitude),
};

export default restController;
