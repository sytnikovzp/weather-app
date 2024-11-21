import {
  authService,
  userService,
  favoriteService,
  locationService,
  weatherService,
} from '../../services';

const restController = {
  // Authentication
  registration: (fullName, email, password) =>
    authService.registration(fullName, email, password),
  login: (email, password) => authService.login(email, password),
  logout: () => authService.logout(),
  refreshAccessToken: (originalRequest) =>
    authService.refreshAccessToken(originalRequest),

  // Users
  fetchAllUsers: () => userService.getAllUsers(),
  fetchUserProfile: () => userService.getUserProfile(),
  fetchUserById: (userId) => userService.getUserById(userId),
  updateUserData: (userData) => userService.updateUser(userData),
  deleteUser: (userId) => userService.deleteUserById(userId),

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
