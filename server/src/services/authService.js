const { User } = require('../db/models');

const { unAuthorizedError } = require('../errors/authErrors');
const { badRequest } = require('../errors/generalErrors');
const {
  hashPassword,
  confirmPassword,
  emailToLowerCase,
} = require('../utils/sharedFunctions');

const { generateTokens, validateRefreshToken } = require('./tokenService');

class AuthService {
  static async registration(fullName, email, password, transaction) {
    const emailToLower = emailToLowerCase(email);
    const person = await User.findOne({ where: { email: emailToLower } });
    if (person) {
      throw badRequest('Цей користувач вже зареєстрований');
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create(
      {
        fullName,
        email: emailToLower,
        password: hashedPassword,
      },
      { transaction, returning: true }
    );
    if (!user) {
      throw badRequest('Користувач не зареєстрований');
    }
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

  static async login(email, password) {
    const emailToLower = emailToLowerCase(email);
    const user = await User.findOne({ where: { email: emailToLower } });
    if (!user) {
      throw unAuthorizedError();
    }
    const isPassRight = await confirmPassword(password, user.password);
    if (!isPassRight) {
      throw unAuthorizedError();
    }
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

  static async refresh(refreshToken) {
    if (!refreshToken) {
      throw unAuthorizedError();
    }
    const data = validateRefreshToken(refreshToken);
    if (!data) {
      throw unAuthorizedError();
    }
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
}

module.exports = AuthService;
