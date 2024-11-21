const bcrypt = require('bcrypt');
// ==============================================================
const { User } = require('../db/models');
// ==============================================================
const { hashPassword, emailToLowerCase } = require('../utils/sharedFunctions');
// ==============================================================
const { generateTokens, validateRefreshToken } = require('./tokenService');
// ==============================================================
const { unAuthorizedError } = require('../errors/authErrors');
const { badRequest } = require('../errors/customErrors');

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
}

module.exports = new AuthService();
