const { Router } = require('express');

const {
  auth: { authHandler },
  validation: { validateFavorite },
} = require('../middlewares');

const {
  getAllFavorites,
  addFavorite,
  removeFavorite,
} = require('../controllers/favoritesController');

const favoritesRouter = new Router();

favoritesRouter.use(authHandler);

favoritesRouter.get('/', getAllFavorites);
favoritesRouter.post('/', validateFavorite, addFavorite);
favoritesRouter.delete('/', removeFavorite);

module.exports = favoritesRouter;
