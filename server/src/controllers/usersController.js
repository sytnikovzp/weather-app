const { sequelize } = require('../db/models');

const {
  getAllUsers,
  getUserByUuid,
  updateUser,
  deleteUser,
} = require('../services/usersService');

class UsersController {
  static async getAllUsers(req, res, next) {
    try {
      const allUsers = await getAllUsers();
      if (allUsers.length > 0) {
        res.status(200).json(allUsers);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get all users error: ', error.message);
      next(error);
    }
  }

  static async getUserByUuid(req, res, next) {
    try {
      const { userUuid } = req.params;
      const user = await getUserByUuid(userUuid);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get user profile error: ', error.message);
      next(error);
    }
  }

  static async getCurrentUserProfile(req, res, next) {
    try {
      const currentUser = await getUserByUuid(req.user.uuid);
      if (currentUser) {
        res.status(200).json(currentUser);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get current user profile error: ', error.message);
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { userUuid } = req.params;
      const { fullName, email } = req.body;
      const updatedUser = await updateUser(
        userUuid,
        fullName,
        email,
        transaction
      );
      if (updatedUser) {
        await transaction.commit();
        res.status(200).json(updatedUser);
      } else {
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Update user error: ', error.message);
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { userUuid } = req.params;
      const deletedUser = await deleteUser(userUuid, transaction);
      if (deletedUser) {
        await transaction.commit();
        res.status(200).json('OK');
      } else {
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Delete user error: ', error.message);
      next(error);
    }
  }
}

module.exports = UsersController;
