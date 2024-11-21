const SERVER_CONFIG = {
  HOST: import.meta.env.WEATHER_SERVER_HOST,
  PORT: parseInt(import.meta.env.WEATHER_SERVER_PORT),
};

const BASE_URL = `http://${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}/api/`;

const WEATHER_API_KEY = import.meta.env.WEATHER_API_KEY;

const AUTH_FORM_INITIAL = {
  email: '',
  password: '',
};

const REGISTRATION_FORM_INITIAL = {
  fullName: '',
  email: '',
  password: '',
};

const MAX_FAVORITES = 5;

export {
  BASE_URL,
  WEATHER_API_KEY,
  AUTH_FORM_INITIAL,
  REGISTRATION_FORM_INITIAL,
  MAX_FAVORITES,
};
