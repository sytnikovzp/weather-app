/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
// ==============================================================
const {
  HASH: { SALT_ROUNDS },
} = require('../../constants');

const users = [
  {
    full_name: 'Test User',
    email: 'test.user@gmail.com',
    password: 'Qwerty12',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

module.exports = {
  async up(queryInterface) {
    for (const user of users) {
      user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    }

    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
