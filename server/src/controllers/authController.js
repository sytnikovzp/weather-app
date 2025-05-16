const { sequelize } = require('../db/models');

const { setRefreshTokenCookie } = require('../utils/cookieHelpers');

const { registration, login, refresh } = require('../services/authService');

class AuthController {
  static async registration(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { name, email, password },
      } = req;
      const authData = await registration(name, email, password, transaction);
      await transaction.commit();
      setRefreshTokenCookie(res, authData.refreshToken);
      res.status(201).json(authData);
    } catch (error) {
      await transaction.rollback();
      console.error('Registration error: ', error.message);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const {
        body: { email, password },
      } = req;
      const authData = await login(email, password);
      setRefreshTokenCookie(res, authData.refreshToken);
      res.status(200).json(authData);
    } catch (error) {
      console.error('Login error: ', error.message);
      next(error);
    }
  }

  static logout(req, res, next) {
    try {
      res.clearCookie('refreshToken');
      res.status(200).json('OK');
    } catch (error) {
      console.error('Logout error: ', error.message);
      next(error);
    }
  }

  static async refresh(req, res, next) {
    try {
      const {
        cookies: { refreshToken },
      } = req;
      const authData = await refresh(refreshToken);
      setRefreshTokenCookie(res, authData.refreshToken);
      res.status(200).json(authData);
    } catch (error) {
      console.error('Refresh error: ', error.message);
      next(error);
    }
  }
}

module.exports = AuthController;
