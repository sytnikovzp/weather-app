const { Router } = require('express');

const {
  auth: { authHandler },
  validation: { validateUser },
} = require('../middlewares');

const {
  getAllUsers,
  getUserByUuid,
  getCurrentUserProfile,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');

const usersRouter = new Router();

usersRouter.use(authHandler);

usersRouter.route('/').get(getAllUsers);

usersRouter.route('/profile').get(getCurrentUserProfile);

usersRouter
  .route('/:userUuid')
  .get(getUserByUuid)
  .patch(validateUser, updateUser)
  .delete(deleteUser);

module.exports = usersRouter;
