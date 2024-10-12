const bcrypt = require('bcrypt');
// ====================================================
const { User } = require('../db/models');
// ====================================================
const {
  generateTokens,
  saveToken,
  deleteToken,
  validateRefreshToken,
  findToken,
} = require('./tokenService');
const { badRequest, unAuthorizedError } = require('../errors/authError');

class AuthService {
  async registration(fullName, email, password) {
    const person = await User.findOne({ where: { email } });
    if (person) throw badRequest('This user already exists');

    const hashedPassword = await bcrypt.hash(password, 10); // Хешируем пароль
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        roleId: user.roleId,
      },
    };
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw unAuthorizedError();

    const isPassRight = await bcrypt.compare(password, user.password);
    if (!isPassRight) throw unAuthorizedError();

    const tokens = generateTokens({ email });
    const userId = user.id;

    await saveToken(userId, tokens.refreshToken);

    return {
      ...tokens,
      user: {
        id: userId,
        email,
      },
    };
  }

  async logout(refreshToken) {
    const token = await deleteToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw unAuthorizedError();

    const data = validateRefreshToken(refreshToken);
    const dbToken = await findToken(refreshToken);

    if (!data || !dbToken) throw unAuthorizedError();

    const { email } = data;
    const user = await User.findOne({ where: { email } });
    const userId = user.id;

    const tokens = generateTokens({ email });

    await saveToken(userId, tokens.refreshToken);

    return {
      ...tokens,
      user: {
        id: userId,
        email,
      },
    };
  }

  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }

  async deleteUser(email) {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const delUser = await User.destroy({ where: { email } });
      return delUser;
    }

    return null;
  }
}

module.exports = new AuthService();
