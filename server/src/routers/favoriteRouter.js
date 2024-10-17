const { Router } = require('express');
// ==============================================================
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require('../controllers/favoriteController');
const {
  auth: { authHandler },
  validation: { validateFavorites },
} = require('../middlewares');

const favoriteRouter = new Router();

favoriteRouter.get('/', authHandler, getFavorites);
favoriteRouter.post('/', authHandler, validateFavorites, addFavorite);
favoriteRouter.delete('/:openWeatherId', authHandler, removeFavorite);

module.exports = favoriteRouter;
