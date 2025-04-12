const { sequelize } = require('../db/models');

const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  deleteUser,
} = require('../services/userService');

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const users = await getAllUsers();
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get all users error: ', error.message);
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get user error: ', error.message);
      next(error);
    }
  }

  static async getCurrentUserProfile(req, res, next) {
    try {
      const userEmail = req.user.email;
      const user = await getCurrentUser(userEmail);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get current user error: ', error.message);
      next(error);
    }
  }

  static async updateUser(req, res, next) {
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
      await transaction.commit();
      res.status(201).json(userData);
    } catch (error) {
      await transaction.rollback();
      console.error('Update user error: ', error.message);
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { userId } = req.params;
      await deleteUser(userId, transaction);
      await transaction.commit();
      res.status(200).json('OK');
    } catch (error) {
      await transaction.rollback();
      console.error('Delete user error: ', error.message);
      next(error);
    }
  }
}

module.exports = new UserController();
