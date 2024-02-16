'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class apyrate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  apyrate.init({
    limit_low: DataTypes.STRING,
    limit_high: DataTypes.STRING,
    coin: DataTypes.STRING,
    categ: DataTypes.STRING,
    apyOpen: DataTypes.STRING,
    apyCap: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'apyrate',
  });
  return apyrate;
};