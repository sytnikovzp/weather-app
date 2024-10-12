const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });

      Favorite.belongsTo(models.City, {
        foreignKey: 'cityId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Favorite.init(
    {
      userId: DataTypes.INTEGER,
      cityId: DataTypes.INTEGER,
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
