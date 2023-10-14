const mongoose = require('mongoose')

const user = new mongoose.Schema({
  name: { type: String, required: true },
  email: {type: String, required: true},
  location: { type: String,},
  image: { type: String,},
  count: { type: Number, default: 0},


  // role: {type : Number, default: 2}
});

const User = mongoose.model('User', user);

module.exports = User;