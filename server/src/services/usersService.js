const { User } = require('../db/models');

const { badRequest, notFound } = require('../errors/generalErrors');
const {
  emailToLowerCase,
  formatDateTime,
  isValidUUID,
} = require('../utils/sharedFunctions');

class UsersService {
  static async getAllUsers() {
    const foundUsers = await User.findAll();
    if (foundUsers.length === 0) {
      throw notFound('Користувачів не знайдено');
    }
    const allUsers = foundUsers.map((user) => ({
      uuid: user.uuid,
      fullName: user.fullName,
    }));
    return allUsers;
  }

  static async getUserByUuid(uuid) {
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

  static async updateUser(uuid, fullName, email, transaction) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Невірний формат UUID');
    }
    const foundUser = await User.findByPk(uuid);
    if (!foundUser) {
      throw notFound('Користувача не знайдено');
    }
    const updateData = {};
    if (fullName) {
      updateData.fullName = fullName;
    }
    if (
      email &&
      emailToLowerCase(email) !== emailToLowerCase(foundUser.email)
    ) {
      const newEmail = emailToLowerCase(email);
      const existingEmail = await User.findOne({ where: { email: newEmail } });
      if (existingEmail) {
        throw badRequest('Ця електронна адреса вже використовується');
      }
      updateData.email = newEmail;
      updateData.tokenVersion = foundUser.tokenVersion + 1;
    }
    const [affectedRows, [updatedUser]] = await User.update(updateData, {
      where: { uuid },
      returning: true,
      transaction,
    });
    if (affectedRows === 0) {
      throw badRequest('Дані цього користувача не оновлено');
    }
    return {
      user: {
        uuid: updatedUser.uuid,
        fullName: updatedUser.fullName,
      },
    };
  }

  static async deleteUser(uuid, transaction) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Невірний формат UUID');
    }
    const foundUser = await User.findByPk(uuid);
    if (!foundUser) {
      throw notFound('Користувача не знайдено');
    }
    const deletedUser = await User.destroy({ where: { uuid }, transaction });
    if (!deletedUser) {
      throw badRequest('Профіль цього користувача не видалено');
    }
    return deletedUser;
  }
}

module.exports = UsersService;
