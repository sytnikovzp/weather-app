const bcrypt = require('bcrypt');
const { format } = require('date-fns');
const { uk } = require('date-fns/locale');

const {
  AUTH_CONFIG: { HASH_SALT_ROUNDS },
} = require('../constants');

const hashPassword = function (password) {
  return bcrypt.hash(password, HASH_SALT_ROUNDS);
};

const confirmPassword = function (password, userPassword) {
  return bcrypt.compare(password, userPassword);
};

const setRefreshTokenCookie = function (res, refreshToken) {
  res.cookie('refreshToken', refreshToken, {
    maxAge: 60 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
};

const isValidUUID = function (uuid) {
  const regex = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i;
  return regex.test(uuid);
};

const formatDateTime = function (date) {
  return format(new Date(date), 'dd MMMM yyyy, HH:mm', { locale: uk });
};

const emailToLowerCase = function (email) {
  return email.toLowerCase();
};

module.exports = {
  emailToLowerCase,
  formatDateTime,
  isValidUUID,
  hashPassword,
  confirmPassword,
  setRefreshTokenCookie,
};
