const { Router } = require('express');

const {
  auth: { authHandler },
} = require('../middlewares');

const { getUserProfile } = require('../controllers/userProfileController');

const userProfileRouter = new Router();

userProfileRouter.use(authHandler);

userProfileRouter.route('/').get(getUserProfile);

module.exports = userProfileRouter;
