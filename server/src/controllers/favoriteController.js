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
      console.log('Error getting favorites is: ', error.message);
      next(error);
    }
  }

  static async addFavorite(req, res, next) {
    try {
      const { openWeatherId, cityName, country } = req.body;
      const { email } = req.user;
      const favorite = await addFavorite(
        email,
        openWeatherId,
        cityName,
        country
      );
      res.status(201).json(favorite);
    } catch (error) {
      console.log('Error adding to favorites is: ', error.message);
      next(error);
    }
  }

  static async removeFavorite(req, res, next) {
    try {
      const { cityId } = req.params;
      const { email } = req.user;
      await removeFavorite(email, cityId);
      res.sendStatus(res.statusCode);
    } catch (error) {
      console.log('Error deleting from favorites is: ', error.message);
      next(error);
    }
  }
}

module.exports = FavoriteController;
