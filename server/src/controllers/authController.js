const { sequelize } = require('../db/models');
// ==============================================================
const {
  registration,
  login,
  refresh,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require('../services/authService');

function setRefreshTokenCookie(res, refreshToken) {
  res.cookie('refreshToken', refreshToken, {
    maxAge: 60 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
}

class AuthController {
  async registration(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { fullName, email, password } = req.body;
      const authData = await registration(
        fullName,
        email,
        password,
        transaction
      );
      setRefreshTokenCookie(res, authData.refreshToken);
      res.status(201).json(authData);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('Registration error is: ', error.message);
      next(error);
    }
  }

  async login(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { email, password } = req.body;
      const authData = await login(email, password, transaction);
      setRefreshTokenCookie(res, authData.refreshToken);
      res.status(200).json(authData);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('Login error is: ', error.message);
      next(error);
    }
  }

  async logout(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      res.clearCookie('refreshToken');
      res.sendStatus(res.statusCode);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('Logout error is: ', error.message);
      next(error);
    }
  }

  async refresh(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { refreshToken } = req.cookies;
      const authData = await refresh(refreshToken, transaction);
      setRefreshTokenCookie(res, authData.refreshToken);
      res.status(200).json(authData);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('Refreshing error is: ', error.message);
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await getAllUsers();
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.log('Get users error is: ', error.message);
      next(error);
    }
  }

  async getCurrentUserProfile(req, res, next) {
    try {
      const userEmail = req.user.email;
      const user = await getUserByEmail(userEmail);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.log('Getting user profile error is: ', error.message);
      next(error);
    }
  }

  async getUserById(req, res, next) {
    const { id } = req.params;
    try {
      const user = await getUserById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.log('Geting user error is: ', error.message);
      next(error);
    }
  }

  async updateUser(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { id, fullName, email, password } = req.body;
      const userData = await updateUser(
        id,
        fullName,
        email,
        password,
        transaction
      );
      res.status(201).json(userData);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('Updating user error is: ', error.message);
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    const transaction = await sequelize.transaction();
    const { id } = req.params;
    try {
      const delUser = await deleteUser(id, transaction);
      if (delUser) {
        res.sendStatus(res.statusCode);
      } else {
        res.status(401);
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('Deleting user error is: ', error.message);
      next(error);
    }
  }
}

module.exports = new AuthController();
