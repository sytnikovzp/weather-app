const { User } = require('../db/models');

const { badRequest, notFound } = require('../errors/customErrors');
const {
  hashPassword,
  emailToLowerCase,
  formatDate,
} = require('../utils/sharedFunctions');

class UserService {
  static async getAllUsers() {
    const users = await User.findAll();
    if (users.length === 0) {
      throw notFound('Users not found');
    }
    const allUsers = await Promise.all(
      users.map((user) => ({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      }))
    );
    return allUsers;
  }

  static async getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw notFound('User not found');
    }
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      createdAt: formatDate(user.createdAt),
      updatedAt: formatDate(user.updatedAt),
    };
  }

  static async getCurrentUser(email) {
    const emailToLower = emailToLowerCase(email);
    const user = await User.findOne({ where: { email: emailToLower } });
    if (!user) {
      throw notFound('User not found');
    }
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      createdAt: formatDate(user.createdAt),
      updatedAt: formatDate(user.updatedAt),
    };
  }

  static async updateUser(id, fullName, email, password, transaction) {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw notFound('User not found');
    }
    const updateData = { fullName };
    if (email && email.toLowerCase() !== user.email.toLowerCase()) {
      const newEmail = emailToLowerCase(email);
      const person = await User.findOne({ where: { email: newEmail } });
      if (person) {
        throw badRequest('This email is already used');
      }
      updateData.email = newEmail;
    }
    if (password) {
      const hashedPassword = await hashPassword(password);
      updateData.password = hashedPassword;
    }
    const [affectedRows, [updatedUser]] = await User.update(updateData, {
      where: { id },
      returning: true,
      transaction,
    });
    if (affectedRows === 0) {
      throw badRequest('User is not updated');
    }
    return {
      user: {
        id: updatedUser.id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
      },
    };
  }

  static async deleteUser(id, transaction) {
    const user = await User.findByPk(id);
    if (!user) {
      throw notFound('User not found');
    }
    const delUser = await User.destroy({ where: { id }, transaction });
    if (!delUser) {
      throw badRequest('User is not deleted');
    }
    return delUser;
  }
}

module.exports = new UserService();
