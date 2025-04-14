const SERVER_HOST = import.meta.env.WEATHER_SERVER_HOST;
const SERVER_PORT = parseInt(import.meta.env.WEATHER_SERVER_PORT);

export const API_CONFIG = {
  BASE_URL: `http://${SERVER_HOST}:${SERVER_PORT}/api`,
};
