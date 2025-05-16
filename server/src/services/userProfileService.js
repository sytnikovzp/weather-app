const { User } = require('../db/models');

const { badRequest, notFound } = require('../errors/generalErrors');
const { formatDateTime } = require('../utils/dateHelpers');
const { isValidUUID } = require('../utils/validators');

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
      name: foundUser.name,
      email: foundUser.email,
      createdAt: formatDateTime(foundUser.createdAt),
      updatedAt: formatDateTime(foundUser.updatedAt),
    };
  }
}

module.exports = UsersService;
