'use strict';
const db = {};
(async () => {

  const fs        = require('fs');
  const path      = require('path');
  const Sequelize = require('sequelize');
  const basename  = path.basename(__filename);
  const env       = process.env.NODE_ENV || 'production';
  const vaultUtility = require('../config/config');
  let config = await vaultUtility();
  config = config[env];


  let sequelize;
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
  
  fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
  
  Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  
})()
  module.exports = db;
  