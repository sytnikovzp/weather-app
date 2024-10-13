const jwt = require('jsonwebtoken');
// ==============================================================
const { Token } = require('../db/models');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: '20m',
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: '60d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ where: { userId } });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }

    const token = await Token.create({ userId, refreshToken });
    return token;
  }

  async deleteToken(refreshToken) {
    const token = await Token.destroy({ where: { refreshToken } });
    return token;
  }

  async findToken(refreshToken) {
    const token = await Token.findOne({ where: { refreshToken } });
    return token;
  }

  validateAccessToken(token) {
    try {
      const data = jwt.verify(token, process.env.ACCESS_SECRET);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const data = jwt.verify(token, process.env.REFRESH_SECRET);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = new TokenService();
