const { Router } = require('express');

const {
  auth: { authHandler },
  validation: { validateFavorites },
} = require('../middlewares');

const {
  getAllFavorites,
  addFavorite,
  removeFavorite,
} = require('../controllers/favoritesController');

const favoritesRouter = new Router();

favoritesRouter.get('/', authHandler, getAllFavorites);
favoritesRouter.post('/', authHandler, validateFavorites, addFavorite);
favoritesRouter.delete('/', authHandler, removeFavorite);

module.exports = favoritesRouter;
