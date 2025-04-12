const { Router } = require('express');

const {
  auth: { authHandler },
  validation: { validateRegistration },
} = require('../middlewares');

const {
  getAllUsers,
  getUserById,
  getCurrentUserProfile,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');

const usersRouter = new Router();

usersRouter
  .route('/')
  .get(authHandler, getAllUsers)
  .put(authHandler, validateRegistration, updateUser);

usersRouter.route('/profile').get(authHandler, getCurrentUserProfile);

usersRouter
  .route('/:userId')
  .get(authHandler, getUserById)
  .delete(authHandler, deleteUser);

module.exports = usersRouter;
