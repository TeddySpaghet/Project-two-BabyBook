'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class baby extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
<<<<<<< HEAD
      models.baby.hasMany(models.post)
      models.baby.belongsTo(models.user)
=======
      // define association here
      models.baby.hasMany(models.post);
      models.baby.belongsTo(models.user);
>>>>>>> submain
    }
  };
  baby.init({
    name: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'baby',
  });
  return baby;
};