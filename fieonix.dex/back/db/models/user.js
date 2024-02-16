'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    birthDay: DataTypes.STRING,
    nation: DataTypes.STRING,
    country: DataTypes.STRING,
    addr1: DataTypes.STRING,
    addr2: DataTypes.STRING,
    city: DataTypes.STRING,
    postcode: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    locked: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN,
    twoFact: DataTypes.BOOLEAN,
    passChg: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    activedAt: DataTypes.DATE,
    avata: DataTypes.STRING,
    alarmTansact: DataTypes.BOOLEAN,
    alarmPricChg: DataTypes.BOOLEAN,
    alarmPricUpt: DataTypes.BOOLEAN,
    isAdmin: DataTypes.BOOLEAN,
    uuid: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'user',
  });
  return User;
};