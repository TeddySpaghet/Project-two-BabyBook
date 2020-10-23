'use strict';
const bcrypt = require('bcrypt');

const {
Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.baby)
    }

    // Compares entered pasword to a hashed password (runs on login)
    validPassword(passwordTyped) {
    return bcrypt.compareSync(passwordTyped, this.password)
    }
    // remove the hashed password from the user object
    toJSON(){
    let userData = this.get()
      //removes the hashed password from userdata object
    delete userData.password
    return userData
    }
};
user.init({
    email: {
    type: DataTypes.STRING,
    validate: {
        isEmail: {
        msg: 'Invalid email address!'
        }
    }
    },
    name: {
    type: DataTypes.STRING, 
    validate: {
        len: {
        args: [1,99],
        msg: 'Name must be between 1 and 99 characters.'
        }
    }
    },
    password: {
    type: DataTypes.STRING,
    validate: {
        len: {
        args: [8,99],
        msg: 'Password must be between 8 and 99 characters'
        }
    }
    }
}, {
    sequelize,
    modelName: 'user',
});


user.beforeCreate( (pendingUser, options) => {
    // if a user exists and if that user has a password
    if (pendingUser && pendingUser.password) {
      // hash the password with bcrypt
    let hash = bcrypt.hashSync(pendingUser.password, 12)
      // store the hash as the user's password
    pendingUser.password = hash
    }
})

return user;
};