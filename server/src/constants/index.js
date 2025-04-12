require('dotenv').config({ path: '../.env' });

module.exports = {
  AUTH: {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME,
    REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME,
  },
  HASH: {
    HASH_SALT_ROUNDS: parseInt(process.env.HASH_SALT_ROUNDS),
  },
  CLIENT: {
    URL: process.env.CLIENT_URL,
  },
  SERVER_CONFIG: {
    HOST: process.env.WEATHER_SERVER_HOST,
    PORT: parseInt(process.env.WEATHER_SERVER_PORT) || 5000,
  },
  DATABASE: {
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_DIALECT: process.env.DB_DIALECT,
  },
};
