const { Router } = require('express');

const {
  auth: { authHandler },
  validation: { validateUser },
} = require('../middlewares');

const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require('../controllers/userProfileController');

const userProfileRouter = new Router();

userProfileRouter.use(authHandler);

userProfileRouter
  .route('/')
  .get(getUserProfile)
  .patch(validateUser, updateUserProfile)
  .delete(deleteUserProfile);

module.exports = userProfileRouter;
