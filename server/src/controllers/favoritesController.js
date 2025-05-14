const { sequelize } = require('../db/models');

const {
  getAllFavorites,
  addFavorite,
  removeFavorite,
} = require('../services/favoritesService');

class FavoritesController {
  static async getAllFavorites(req, res, next) {
    try {
      const {
        user: { uuid },
      } = req;
      const allFavorites = await getAllFavorites(uuid);
      if (allFavorites) {
        res.status(200).json(allFavorites);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get all favorites error: ', error.message);
      next(error);
    }
  }

  static async addFavorite(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { city, countryCode, latitude, longitude },
        user: { uuid },
      } = req;
      const newFavorite = await addFavorite(
        uuid,
        city,
        countryCode,
        latitude,
        longitude,
        transaction
      );
      if (newFavorite) {
        await transaction.commit();
        res.status(201).json(newFavorite);
      } else {
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Add to favorites error: ', error.message);
      next(error);
    }
  }

  static async removeFavorite(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        query: { latitude, longitude },
        user: { uuid },
      } = req;
      const deletedFavorite = await removeFavorite(
        uuid,
        latitude,
        longitude,
        transaction
      );
      if (deletedFavorite) {
        await transaction.commit();
        res.status(200).json('OK');
      } else {
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Delete from favorites error: ', error.message);
      next(error);
    }
  }
}

module.exports = FavoritesController;
