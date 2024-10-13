const { Router } = require('express');
// ==============================================================
const {
  registration,
  login,
  logout,
  refresh,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/authController');
const {
  auth: { authHandler },
} = require('../middlewares');

const authRouter = new Router();

authRouter.post('/registration', registration);
authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.get('/refresh', refresh);
authRouter.get('/users', authHandler, getAllUsers);
authRouter.get('/users/:id', authHandler, getUserById);
authRouter.put('/users', authHandler, updateUser);
authRouter.delete('/delete/:id', authHandler, deleteUser);

module.exports = authRouter;
