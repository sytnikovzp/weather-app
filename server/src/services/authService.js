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
    const newUser = await User.create(
      {
        fullName,
        email: emailToLower,
        password: hashedPassword,
      },
      { transaction, returning: true }
    );
    if (!newUser) {
      throw badRequest('Користувач не зареєстрований');
    }
    const tokens = generateTokens(newUser);
    return {
      ...tokens,
      authenticatedUser: {
        uuid: newUser.uuid,
        fullName: newUser.fullName,
      },
    };
  }

  static async login(email, password) {
    const emailToLower = emailToLowerCase(email);
    const foundUser = await User.findOne({ where: { email: emailToLower } });
    if (!foundUser) {
      throw unAuthorizedError();
    }
    const isPassRight = await confirmPassword(password, foundUser.password);
    if (!isPassRight) {
      throw unAuthorizedError();
    }
    const tokens = generateTokens(foundUser);
    return {
      ...tokens,
      authenticatedUser: {
        uuid: foundUser.uuid,
        fullName: foundUser.fullName,
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
    const { uuid } = data;
    const foundUser = await User.findByPk(uuid);
    const tokens = generateTokens(foundUser);
    return {
      ...tokens,
      authenticatedUser: {
        uuid: foundUser.uuid,
        fullName: foundUser.fullName,
      },
    };
  }
}

module.exports = AuthService;
