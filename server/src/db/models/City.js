const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      City.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: 'cityUuid',
        otherKey: 'userUuid',
      });
    }
  }
  City.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: [1, 100],
        },
      },
      countryCode: {
        type: DataTypes.STRING(2),
        allowNull: false,
        validate: {
          len: [2, 2],
          isUppercase: true,
          is: /^[A-Z]{2}$/,
        },
      },
      latitude: {
        type: DataTypes.DECIMAL(12, 8),
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DECIMAL(12, 8),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'City',
      tableName: 'cities',
      timestamps: true,
      underscored: true,
    }
  );
  return City;
};
