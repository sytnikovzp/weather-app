const SERVER_CONFIG = {
  HOST: import.meta.env.WEATHER_SERVER_HOST,
  PORT: parseInt(import.meta.env.WEATHER_SERVER_PORT),
};

const BASE_URL = `http://${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}/api/`;

const { WEATHER_API_KEY } = import.meta.env;

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
  AUTH_FORM_INITIAL,
  BASE_URL,
  MAX_FAVORITES,
  REGISTRATION_FORM_INITIAL,
  WEATHER_API_KEY,
};
