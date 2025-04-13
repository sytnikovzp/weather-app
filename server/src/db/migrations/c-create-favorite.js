/* eslint-disable camelcase */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable('favorites', {
      user_uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'uuid',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      city_uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'cities',
          key: 'uuid',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint('favorites', {
      fields: ['user_uuid', 'city_uuid'],
      type: 'primary key',
      name: 'favorites_pkey',
    });
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP EXTENSION IF EXISTS "uuid-ossp";'
    );
    await queryInterface.dropTable('favorites');
  },
};
