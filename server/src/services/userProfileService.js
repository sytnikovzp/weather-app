const { User } = require('../db/models');

const { badRequest, notFound } = require('../errors/generalErrors');
const { formatDateTime, isValidUUID } = require('../utils/sharedFunctions');

class UsersService {
  static async getUserProfile(uuid) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Невірний формат UUID');
    }
    const foundUser = await User.findByPk(uuid);
    if (!foundUser) {
      throw notFound('Користувача не знайдено');
    }
    return {
      uuid: foundUser.uuid,
      fullName: foundUser.fullName,
      email: foundUser.email,
      createdAt: formatDateTime(foundUser.createdAt),
      updatedAt: formatDateTime(foundUser.updatedAt),
    };
  }
}

module.exports = UsersService;
