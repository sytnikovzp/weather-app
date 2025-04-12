const { sequelize } = require('../db/models');

const {
  getAllFavorites,
  addFavorite,
  removeFavorite,
} = require('../services/favoritesService');

class FavoritesController {
  static async getAllFavorites(req, res, next) {
    try {
      const { email } = req.user;
      const favorites = await getAllFavorites(email);
      res.status(200).json(favorites);
    } catch (error) {
      console.error('Get favorites error: ', error.message);
      next(error);
    }
  }

  static async addFavorite(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { cityName, country, latitude, longitude } = req.body;
      const { email } = req.user;
      const favorite = await addFavorite(
        email,
        cityName,
        country,
        latitude,
        longitude,
        transaction
      );
      await transaction.commit();
      res.status(201).json(favorite);
    } catch (error) {
      await transaction.rollback();
      console.error('Add to favorites error: ', error.message);
      next(error);
    }
  }

  static async removeFavorite(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { latitude, longitude } = req.query;
      const { email } = req.user;
      await removeFavorite(email, latitude, longitude, transaction);
      await transaction.commit();
      res.status(200).json('OK');
    } catch (error) {
      await transaction.rollback();
      console.error('Delete from favorites error: ', error.message);
      next(error);
    }
  }
}

module.exports = FavoritesController;
