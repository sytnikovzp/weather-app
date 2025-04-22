const { getUserProfile } = require('../services/userProfileService');

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
}

module.exports = UserProfileController;
