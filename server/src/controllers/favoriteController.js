const { sequelize } = require('../db/models');
// ==============================================================
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require('../services/favoriteService');

class FavoriteController {
  static async getFavorites(req, res, next) {
    try {
      const { email } = req.user;
      const favorites = await getFavorites(email);
      res.status(200).json(favorites);
    } catch (error) {
      console.log('Get favorites error: ', error.message);
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
      console.log('Add to favorites error: ', error.message);
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
      res.sendStatus(res.statusCode);
    } catch (error) {
      await transaction.rollback();
      console.log('Delete from favorites error: ', error.message);
      next(error);
    }
  }
}

module.exports = FavoriteController;
