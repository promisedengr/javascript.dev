'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  transaction.init({
    addr_from: DataTypes.STRING,
    addr_to: DataTypes.STRING,
    amount: DataTypes.STRING,
    coin: DataTypes.STRING,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    modelName: 'transaction',
  });
  return transaction;
};