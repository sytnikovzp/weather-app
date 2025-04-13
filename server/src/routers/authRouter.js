const { Router } = require('express');

const {
  validation: { validateRegistration, validateLogin },
} = require('../middlewares');

const {
  registration,
  login,
  logout,
  refresh,
} = require('../controllers/authController');

const authRouter = new Router();

authRouter.post('/registration', validateRegistration, registration);
authRouter.post('/login', validateLogin, login);
authRouter.get('/logout', logout);
authRouter.get('/refresh', refresh);

module.exports = authRouter;
