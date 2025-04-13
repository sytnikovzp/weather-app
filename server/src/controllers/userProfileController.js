const { sequelize } = require('../db/models');

const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require('../services/userProfileService');

class UserProfileController {
  static async getUserProfile(req, res, next) {
    try {
      const { uuid } = req.user;
      const currentUser = await getUserProfile(uuid);
      if (currentUser) {
        res.status(200).json(currentUser);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get user profile error: ', error.message);
      next(error);
    }
  }

  static async updateUserProfile(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { fullName, email },
        user: { uuid },
      } = req;
      const updatedUser = await updateUserProfile(
        uuid,
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
      console.error('Update user profile error: ', error.message);
      next(error);
    }
  }

  static async deleteUserProfile(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { uuid } = req.user;
      const deletedUser = await deleteUserProfile(uuid, transaction);
      if (deletedUser) {
        await transaction.commit();
        res.status(200).json('OK');
      } else {
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Delete user profile error: ', error.message);
      next(error);
    }
  }
}

module.exports = UserProfileController;
