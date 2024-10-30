const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Favorite.belongsTo(models.City, {
        foreignKey: 'cityId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Favorite.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      cityId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'cities',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Favorite',
      tableName: 'favorites',
      underscored: true,
    }
  );
  return Favorite;
};
