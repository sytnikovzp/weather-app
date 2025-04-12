const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { users } = await POSTGRES_DATA();
    await queryInterface.bulkInsert('users', users, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
