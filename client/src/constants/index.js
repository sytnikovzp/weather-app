const SERVER_CONFIG = {
  HOST: import.meta.env.WEATHER_SERVER_HOST,
  PORT: parseInt(import.meta.env.WEATHER_SERVER_PORT),
};

export const BASE_URL = `http://${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}/api/`;
