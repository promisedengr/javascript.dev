const mongoose = require('mongoose')

const account = new mongoose.Schema({
  address: { type: String, required: true },
  name: { type: String, default: null},
  bio: { type: String, default: ''},
});
// }, { toJSON: {virtuals: true} });

const Account = mongoose.model('Account', account);

module.exports = Account;