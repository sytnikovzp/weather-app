const bcrypt = require('bcrypt');
const { format } = require('date-fns');
// ==============================================================
const {
  HASH: { SALT_ROUNDS },
} = require('../constants');

module.exports.hashPassword = async function (password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

module.exports.formatDate = function (date) {
  return format(new Date(date), 'dd MMMM yyyy, HH:mm');
};

module.exports.emailToLowerCase = function (email) {
  return email.toLowerCase();
};
