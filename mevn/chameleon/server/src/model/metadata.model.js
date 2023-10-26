const mongoose = require('mongoose')

const metadata = new mongoose.Schema({
    writer: { type: String, required: true },
    rootCid: { type: String, required: true },
    receiver: { type: String, default: '' },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    sponsors: {type: [{sender: String, amount: Number}], default:undefined},
    date: {type: Date, default: Date.now}
    // status: {type: Number, default: 0},

    // cid: { type: String, required: true },
    // overview: { type: String, required: true },
    // points: { type: Number, required: true },
    // area: { type: String, required: true },
    // pointDensity: { type: String, required: true },
    // classification: { type: Array, required: true },
    // xCoordinate: { type: String, required: true },
    // yCoordinate: { type: String, required: true },
    // attributes: { type: mongoose.Schema.Types.Mixed, required: true },
    // start_at: { type: Date, required: true },
    // end_at: { type: Date, required: true },
    // publication_date: { type: Date, required: true },
    // funders: { type: Array, required: true },
    // partners: { type: Array, required: true },
    // collectors: { type: Array, required: true },
    // acknowledgement: { type: String, required: true },
    // citation: { type: String, required: true },
    // license: { type: String, required: true },
    // files: { type: Array, required: true },
});

const Metadata = mongoose.model('Metadata', metadata);

module.exports = Metadata;