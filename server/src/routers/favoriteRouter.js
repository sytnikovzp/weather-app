const { Router } = require('express');

const {
  auth: { authHandler },
  validation: { validateFavorites },
} = require('../middlewares');

const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require('../controllers/favoriteController');

const favoriteRouter = new Router();

favoriteRouter.get('/', authHandler, getFavorites);
favoriteRouter.post('/', authHandler, validateFavorites, addFavorite);
favoriteRouter.delete('/', authHandler, removeFavorite);

module.exports = favoriteRouter;
