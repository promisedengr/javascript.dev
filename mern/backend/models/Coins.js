const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const CoinsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    unique: true,
  },
});

CoinsSchema.plugin(uniqueValidator);

module.exports = mongoose.model("coins", CoinsSchema);
