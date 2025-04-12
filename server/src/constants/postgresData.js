/* eslint-disable camelcase */

const { hashPassword } = require('../utils/sharedFunctions');

const postgresData = async () => {
  const now = new Date();

  return {
    users: [
      {
        full_name: 'Test User',
        email: 'test.user@gmail.com',
        password: await hashPassword('Qwerty12'),
        created_at: now,
        updated_at: now,
      },
    ],
  };
};

module.exports = postgresData;
