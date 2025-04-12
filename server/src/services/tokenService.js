const jwt = require('jsonwebtoken');
// ==============================================================
const {
  AUTH: {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_LIFETIME,
    REFRESH_TOKEN_LIFETIME,
  },
} = require('../constants');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_LIFETIME,
    });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_LIFETIME,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const data = jwt.verify(token, ACCESS_TOKEN_SECRET);
      return data;
    } catch (error) {
      console.log('Access token validation error:', error.message);
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const data = jwt.verify(token, REFRESH_TOKEN_SECRET);
      return data;
    } catch (error) {
      console.log('Refresh token validation error:', error.message);
      return null;
    }
  }
}

module.exports = new TokenService();
