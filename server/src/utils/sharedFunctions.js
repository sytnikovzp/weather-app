const bcrypt = require('bcrypt');
const { format } = require('date-fns');
// ==============================================================
const {
  HASH: { HASH_SALT_ROUNDS },
} = require('../constants');

module.exports.hashPassword = async function (password) {
  return await bcrypt.hash(password, HASH_SALT_ROUNDS);
};

module.exports.setRefreshTokenCookie = function (res, refreshToken) {
  res.cookie('refreshToken', refreshToken, {
    maxAge: 60 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
};

module.exports.formatDate = function (date) {
  return format(new Date(date), 'dd MMMM yyyy, HH:mm');
};

module.exports.emailToLowerCase = function (email) {
  return email.toLowerCase();
};
