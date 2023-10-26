const mongoose = require('mongoose')

const townhall = new mongoose.Schema({
    superwarden:  { type: String, required: true },
    villagers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account'}],
    // villagers: [{ type: mongoose.Schema.Types.ObjectId}],

    details: {type: mongoose.Schema.Types.Mixed, required: true},
    created_at : {type: Date, default: Date.now},
    updated_at : {type: Date, default: Date.now},
    deleted_at : {type: Date, default: null},
})
// }, { strict: false });


const Townhall = mongoose.model('Townhall', townhall);

module.exports = Townhall;