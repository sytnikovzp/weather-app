const bcrypt = require('bcrypt');
// ==============================================================
const { User } = require('../db/models');
// ==============================================================
const {
  hashPassword,
  emailToLowerCase,
  formatDate,
} = require('../utils/sharedFunctions');
// ==============================================================
const { generateTokens, validateRefreshToken } = require('./tokenService');
// ==============================================================
const { unAuthorizedError } = require('../errors/authErrors');
const { badRequest, notFound } = require('../errors/customErrors');

class AuthService {
  async registration(fullName, email, password, transaction) {
    const emailToLower = emailToLowerCase(email);
    const person = await User.findOne({ where: { email: emailToLower } });
    if (person) throw badRequest('This user already exists');
    const hashedPassword = await hashPassword(password);
    const user = await User.create(
      {
        fullName,
        email: emailToLower,
        password: hashedPassword,
      },
      { transaction, returning: true }
    );
    if (!user) throw badRequest('User is not registered');
    const tokens = generateTokens({ email });
    return {
      ...tokens,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: emailToLower,
      },
    };
  }

  async login(email, password) {
    const emailToLower = emailToLowerCase(email);
    const user = await User.findOne({ where: { email: emailToLower } });
    if (!user) throw unAuthorizedError();
    const isPassRight = await bcrypt.compare(password, user.password);
    if (!isPassRight) throw unAuthorizedError();
    const tokens = generateTokens({ email });
    return {
      ...tokens,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: emailToLower,
      },
    };
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw unAuthorizedError();
    const data = validateRefreshToken(refreshToken);
    if (!data) throw unAuthorizedError();
    const { email } = data;
    const emailToLower = emailToLowerCase(email);
    const user = await User.findOne({ where: { email: emailToLower } });
    const tokens = generateTokens({ email });
    return {
      ...tokens,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: emailToLower,
      },
    };
  }

  async getAllUsers() {
    const users = await User.findAll();
    if (users.length === 0) throw notFound('Users not found');
    const allUsers = await Promise.all(
      users.map(async (user) => {
        return {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        };
      })
    );
    return allUsers;
  }

  async getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) throw notFound('User not found');
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      createdAt: formatDate(user.createdAt),
      updatedAt: formatDate(user.updatedAt),
    };
  }

  async getUserByEmail(email) {
    const emailToLower = emailToLowerCase(email);
    const user = await User.findOne({ where: { email: emailToLower } });
    if (!user) throw notFound('User not found');
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      createdAt: formatDate(user.createdAt),
      updatedAt: formatDate(user.updatedAt),
    };
  }

  async updateUser(id, fullName, email, password, transaction) {
    const user = await User.findOne({ where: { id } });
    if (!user) throw notFound('User not found');
    const updateData = { fullName };
    if (email && email.toLowerCase() !== user.email.toLowerCase()) {
      const newEmail = emailToLowerCase(email);
      const person = await User.findOne({ where: { email: newEmail } });
      if (person) throw badRequest('This email is already used');
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
    if (affectedRows === 0) throw badRequest('User is not updated');
    return {
      user: {
        id: updatedUser.id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
      },
    };
  }

  async deleteUser(id, transaction) {
    const user = await User.findByPk(id);
    if (!user) throw notFound('User not found');
    const delUser = await User.destroy({ where: { id }, transaction });
    if (!delUser) throw badRequest('User is not deleted');
    return delUser;
  }
}

module.exports = new AuthService();
