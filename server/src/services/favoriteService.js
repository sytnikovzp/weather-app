const { Favorite, City, User } = require('../db/models');

const { badRequest, notFound } = require('../errors/customErrors');
const { emailToLowerCase } = require('../utils/sharedFunctions');

class FavoriteService {
  static async getFavorites(email) {
    const emailToLower = emailToLowerCase(email);
    const user = await User.findOne({ where: { email: emailToLower } });
    if (!user) {
      throw notFound('User not found');
    }
    const favorites = await Favorite.findAll({
      where: { userId: user.id },
      include: [
        {
          model: City,
          attributes: ['title', 'country', 'latitude', 'longitude'],
        },
      ],
      order: [['created_at', 'ASC']],
    });
    const formattedFavorites = favorites.map((favorite) => ({
      cityName: favorite.City.title,
      country: favorite.City.country,
      lat: favorite.City.latitude,
      lon: favorite.City.longitude,
    }));
    return formattedFavorites;
  }

  static async addFavorite(
    userEmail,
    cityName,
    country,
    latitude,
    longitude,
    transaction
  ) {
    const emailToLower = emailToLowerCase(userEmail);
    const user = await User.findOne({ where: { email: emailToLower } });
    if (!user) {
      throw notFound('User not found');
    }
    const favoriteCount = await Favorite.count({ where: { userId: user.id } });
    if (favoriteCount >= 5) {
      throw badRequest('Cannot add more than 5 favorites');
    }
    let city = await City.findOne({ where: { latitude, longitude } });
    if (!city) {
      city = await City.create(
        {
          title: cityName,
          country,
          latitude,
          longitude,
        },
        { transaction }
      );
    }
    const existingFavorite = await Favorite.findOne({
      where: { userId: user.id, cityId: city.id },
    });
    if (existingFavorite) {
      throw badRequest('The city is already in favorites');
    }
    await Favorite.create(
      {
        userId: user.id,
        cityId: city.id,
      },
      { transaction }
    );
    return {
      cityName: city.title,
      country: city.country,
      lat: city.latitude,
      lon: city.longitude,
    };
  }

  static async removeFavorite(userEmail, latitude, longitude, transaction) {
    const emailToLower = emailToLowerCase(userEmail);
    const user = await User.findOne({ where: { email: emailToLower } });
    if (!user) {
      throw notFound('User not found');
    }
    const city = await City.findOne({ where: { latitude, longitude } });
    if (!city) {
      throw notFound('City not found');
    }
    const favorite = await Favorite.findOne({
      where: { userId: user.id, cityId: city.id },
    });
    if (!favorite) {
      throw notFound('Favorite not found');
    }
    await Favorite.destroy({
      where: { userId: user.id, cityId: city.id },
      transaction,
    });
  }
}

module.exports = new FavoriteService();
