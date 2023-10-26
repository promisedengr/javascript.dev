const mongoose = require('mongoose')

const proposal = new mongoose.Schema({
  slug : {type: String, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
  type: {type : Number, default : 0},// 0 : single choice, 1: approval voting 2: two rounding
  // ctr_addr: {type: String, required: true},
  threshold: {type : Number, default : 0},
  multiplier: {type : Number, default : 1},
  percent: {type : Number, default : 0},
  title: {type: String, required: true},
  description: {type: String, required: true},
  summary: {type: String, required: true},
  timezone: {type: mongoose.Schema.Types.Mixed, required: true},
  f_start_at: {type: Date, required: true},
  f_end_at: {type: Date, required: true},
  s_start_at: {type: Date},
  s_end_at: {type: Date},
  voters : { type : Array},
  result : { type : Array},
  status : {type: Number, default: 0}, // -1: not set, 0: expecting 1: on process 2: ended
  s_voters : { type : Array},
  s_result : { type : Array},
  s_options:{type: Array},
  importance: {type : Boolean, default: false},
  created_at: {type: Date, default: Date.now}

// });
}, { strict: false });

// }, { toJSON: {virtuals: true} });

const Proposal = mongoose.model('Proposal', proposal);

module.exports = Proposal;