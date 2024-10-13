const bcrypt = require('bcrypt');
// ==============================================================
const { User, Token } = require('../db/models');
// ==============================================================
const { SALT_ROUNDS } = require('../constants');
const {
  generateTokens,
  saveToken,
  deleteToken,
  validateRefreshToken,
  findToken,
} = require('./tokenService');
const { badRequest, unAuthorizedError } = require('../errors/authError');

async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

function emailToLowerCase(email) {
  return email.toLowerCase();
}

class AuthService {
  async registration(fullName, email, password) {
    const emailToLower = emailToLowerCase(email);

    const person = await User.findOne({ where: { email: emailToLower } });
    if (person) throw badRequest('This user already exists');

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      fullName,
      email: emailToLower,
      password: hashedPassword,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
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
    const userId = user.id;

    await saveToken(userId, tokens.refreshToken);

    return {
      ...tokens,
      user: {
        id: userId,
        email: emailToLower,
      },
    };
  }

  async logout(refreshToken) {
    if (!refreshToken) throw unAuthorizedError();

    const token = await deleteToken(refreshToken);

    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw unAuthorizedError();

    const data = validateRefreshToken(refreshToken);
    const dbToken = await findToken(refreshToken);

    if (!data || !dbToken) throw unAuthorizedError();

    const { email } = data;
    const emailToLower = emailToLowerCase(email);

    const user = await User.findOne({ where: { email: emailToLower } });
    const userId = user.id;

    const tokens = generateTokens({ email: emailToLower });

    await saveToken(userId, tokens.refreshToken);

    return {
      ...tokens,
      user: {
        id: userId,
        email: emailToLower,
      },
    };
  }

  async getAllUsers() {
    const users = await User.findAll();

    if (users.length === 0) {
      throw badRequest('Users not found');
    }

    return users;
  }

  async getUserById(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw badRequest('User not found');
    }

    return user;
  }

  async updateUser(id, fullName, email, password) {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw badRequest('User not found');
    }

    const updateData = { fullName };

    if (email && email.toLowerCase() !== user.email.toLowerCase()) {
      const newEmail = emailToLowerCase(email);

      const person = await User.findOne({ where: { email: newEmail } });
      if (person) throw badRequest('This email is already used');

      updateData.email = newEmail;

      const token = await Token.findOne({ where: { userId: id } });

      await deleteToken(token.refreshToken);
    }

    if (password) {
      const hashedPassword = await hashPassword(password);
      updateData.password = hashedPassword;
    }

    const [affectedRows, [updatedUsers]] = await User.update(updateData, {
      where: { id },
      returning: true,
    });

    if (affectedRows === 0) {
      throw badRequest('User not found');
    }

    return {
      user: {
        id: updatedUsers.id,
        email: updatedUsers.email,
      },
    };
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw badRequest('User not found');
    }

    const delUser = await User.destroy({ where: { id } });
    return delUser;
  }
}

module.exports = new AuthService();
