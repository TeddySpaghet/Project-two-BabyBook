'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.post.belongsTo(models.baby);
    }
  };
  post.init({
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    img: DataTypes.STRING,
    title: DataTypes.STRING,
    firsts: DataTypes.TEXT,
    favorites: DataTypes.TEXT,
    babyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
}; 