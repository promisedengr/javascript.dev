'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Wallet.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: false
    },
    account_categ: DataTypes.STRING,
    blockchain: DataTypes.STRING,
    private: DataTypes.STRING,
    public: DataTypes.STRING,
    address: DataTypes.STRING,
    wif: DataTypes.STRING,
    balance: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'wallet',
  });
  return Wallet;
};