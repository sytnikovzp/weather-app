/* eslint-disable camelcase */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('favorites', {
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      city_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cities',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('favorites', {
      fields: ['user_id', 'city_id'],
      type: 'primary key',
      name: 'favorites_pkey',
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('favorites');
  },
};
