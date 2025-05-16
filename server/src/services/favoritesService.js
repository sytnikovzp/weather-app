const { Favorite, City, User } = require('../db/models');

const { badRequest, notFound } = require('../errors/generalErrors');
const { isValidUUID } = require('../utils/validators');

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
          attributes: ['title', 'countryCode', 'latitude', 'longitude'],
        },
      ],
      order: [['created_at', 'ASC']],
    });
    const allFavorites = foundFavorites.map((favorite) => ({
      city: favorite.City.title,
      countryCode: favorite.City.countryCode,
      latitude: favorite.City.latitude,
      longitude: favorite.City.longitude,
    }));
    return allFavorites;
  }

  static async addFavorite(
    uuid,
    city,
    countryCode,
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
    let newFavoriteCity = await City.findOne({
      where: { latitude, longitude },
    });

    if (!newFavoriteCity) {
      newFavoriteCity = await City.create(
        {
          title: city,
          countryCode,
          latitude,
          longitude,
        },
        { transaction }
      );
    }
    const existingFavorite = await Favorite.findOne({
      where: { userUuid: foundUser.uuid, cityUuid: newFavoriteCity.uuid },
    });
    if (existingFavorite) {
      throw badRequest('Це місто вже є у списку улюблених');
    }
    await Favorite.create(
      {
        userUuid: foundUser.uuid,
        cityUuid: newFavoriteCity.uuid,
      },
      { transaction }
    );
    const addedFavorite = {
      city: newFavoriteCity.title,
      countryCode: newFavoriteCity.countryCode,
      latitude: newFavoriteCity.latitude,
      longitude: newFavoriteCity.longitude,
    };
    return addedFavorite;
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
