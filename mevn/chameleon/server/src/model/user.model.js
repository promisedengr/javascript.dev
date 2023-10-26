const mongoose = require('mongoose')

const user = new mongoose.Schema({
  address: { type: String, required: true },
  pinataKey: { type: String,},
  pinataSecret: { type: String,},

  // role: {type : Number, default: 2}
});

const User = mongoose.model('User', user);

module.exports = User;