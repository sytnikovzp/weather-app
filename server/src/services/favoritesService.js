const { Favorite, City, User } = require('../db/models');

const { badRequest, notFound } = require('../errors/generalErrors');
const { emailToLowerCase } = require('../utils/sharedFunctions');

class FavoritesService {
  static async getAllFavorites(email) {
    const emailToLower = emailToLowerCase(email);
    const user = await User.findOne({ where: { email: emailToLower } });
    if (!user) {
      throw notFound('Користувача не знайдено');
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
      throw notFound('Користувача не знайдено');
    }
    const favoriteCount = await Favorite.count({ where: { userId: user.id } });
    if (favoriteCount >= 5) {
      throw badRequest('Не можна додати більше 5 улюблених міст');
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
      throw badRequest('Це місто вже є у списку улюблених');
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
      throw notFound('Користувача не знайдено');
    }
    const city = await City.findOne({ where: { latitude, longitude } });
    if (!city) {
      throw notFound('Місто не знайдено');
    }
    const favorite = await Favorite.findOne({
      where: { userId: user.id, cityId: city.id },
    });
    if (!favorite) {
      throw notFound('Це улюблене місто не знайдено');
    }
    await Favorite.destroy({
      where: { userId: user.id, cityId: city.id },
      transaction,
    });
  }
}

module.exports = FavoritesService;
