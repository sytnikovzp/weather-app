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
} = require('../controllers/userController');

const userRouter = new Router();

userRouter
  .route('/')
  .get(authHandler, getAllUsers)
  .put(authHandler, validateRegistration, updateUser);

userRouter.route('/profile').get(authHandler, getCurrentUserProfile);

userRouter
  .route('/:userId')
  .get(authHandler, getUserById)
  .delete(authHandler, deleteUser);

module.exports = userRouter;
