const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, {
        foreignKey: 'userUuid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Favorite.belongsTo(models.City, {
        foreignKey: 'cityUuid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Favorite.init(
    {
      userUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'uuid',
        },
      },
      cityUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'cities',
          key: 'uuid',
        },
      },
    },
    {
      sequelize,
      modelName: 'Favorite',
      tableName: 'favorites',
      timestamps: true,
      underscored: true,
    }
  );
  return Favorite;
};
