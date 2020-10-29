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
    height: DataTypes.STRING,
    weight: DataTypes.STRING,
    img: DataTypes.STRING,
    title: {
      type:  DataTypes.STRING,
      validate: {
        len: {
        args: [1,20],
        msg: 'Title must be between 1 and 20 characters.'
        }
      }
    },
    firsts: DataTypes.TEXT,
    favorites: DataTypes.TEXT,
    babyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
}; 