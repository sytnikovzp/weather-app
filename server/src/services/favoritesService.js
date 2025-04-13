const { Favorite, City, User } = require('../db/models');

const { badRequest, notFound } = require('../errors/generalErrors');
const { isValidUUID } = require('../utils/sharedFunctions');

class FavoritesService {
  static async getAllFavorites(uuid) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Невірний формат UUID');
    }
    const foundUser = await User.findByPk(uuid);
    if (!foundUser) {
      throw notFound('Користувача не знайдено');
    }
    const foundFavorites = await Favorite.findAll({
      where: { userUuid: foundUser.uuid },
      include: [
        {
          model: City,
          attributes: ['title', 'country', 'latitude', 'longitude'],
        },
      ],
      order: [['created_at', 'ASC']],
    });
    if (foundFavorites.length === 0) {
      throw notFound('Список улюблених міст порожній');
    }
    const allFavorites = foundFavorites.map((favorite) => ({
      cityName: favorite.City.title,
      country: favorite.City.country,
      lat: favorite.City.latitude,
      lon: favorite.City.longitude,
    }));
    return allFavorites;
  }

  static async addFavorite(
    uuid,
    cityName,
    country,
    latitude,
    longitude,
    transaction
  ) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Невірний формат UUID');
    }
    const foundUser = await User.findByPk(uuid);
    if (!foundUser) {
      throw notFound('Користувача не знайдено');
    }
    const favoriteCount = await Favorite.count({
      where: { userUuid: foundUser.uuid },
    });
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
      where: { userUuid: foundUser.uuid, cityUuid: city.uuid },
    });
    if (existingFavorite) {
      throw badRequest('Це місто вже є у списку улюблених');
    }
    await Favorite.create(
      {
        userUuid: foundUser.uuid,
        cityUuid: city.uuid,
      },
      { transaction }
    );
    const newFavorite = {
      cityName: city.title,
      country: city.country,
      lat: city.latitude,
      lon: city.longitude,
    };
    return newFavorite;
  }

  static async removeFavorite(uuid, latitude, longitude, transaction) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Невірний формат UUID');
    }
    const foundUser = await User.findByPk(uuid);
    if (!foundUser) {
      throw notFound('Користувача не знайдено');
    }
    const foundCity = await City.findOne({ where: { latitude, longitude } });
    if (!foundCity) {
      throw notFound('Місто не знайдено');
    }
    const foundFavorite = await Favorite.findOne({
      where: { userUuid: foundUser.uuid, cityUuid: foundCity.uuid },
    });
    if (!foundFavorite) {
      throw notFound('Це місто відсутнє у списку улюблених');
    }
    const deletedFavorite = await Favorite.destroy({
      where: { userUuid: foundUser.uuid, cityUuid: foundCity.uuid },
      transaction,
    });
    if (!deletedFavorite) {
      throw badRequest('Це місто не видалено зі списку улюблених');
    }
    return deletedFavorite;
  }
}

module.exports = FavoritesService;
