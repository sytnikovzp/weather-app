const bcrypt = require('bcrypt');

const {
  AUTH_CONFIG: { HASH_SALT_ROUNDS },
} = require('../constants');

const hashPassword = function (password) {
  return bcrypt.hash(password, HASH_SALT_ROUNDS);
};

const confirmPassword = function (password, userPassword) {
  return bcrypt.compare(password, userPassword);
};

module.exports = {
  hashPassword,
  confirmPassword,
};
