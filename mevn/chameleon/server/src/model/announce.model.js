const mongoose = require('mongoose')

const announce = new mongoose.Schema({
  slug: {type: String, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
  cid: {type: String},
  title: {type: String, required: true},
  summary: {type: String, required: true},
  attachment: {type: String},
  expire_at: {type: Date, required: true},
  timezone: {type: mongoose.Schema.Types.Mixed, required: true},
  importance: {type: Boolean, default: false},
  created_at: {type: Date, default: Date.now}

});
// }, { strict: false });

// }, { toJSON: {virtuals: true} });

const Announce = mongoose.model('Announce', announce);

module.exports = Announce;