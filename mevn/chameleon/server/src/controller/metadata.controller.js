const Metadata = require("../model/metadata.model");

async function sample (req, res, next){
    try {
        console.log(`Connected to sample`)
        res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/metadata.controller/sample' + error)
    }
}

async function saveToDB (req, res, next){
    try {
        console.log(`Connected to saveToDB`)
        var metadata = new Metadata({
            writer : req.body.writer,
            rootCid : req.body.rootCid,
            receiver: req.body.receiver,
            data: req.body
            // cid: req.body.cid,
            // overview: req.body.overview,
            // format: req.body.format,
            // points: req.body.points,
            // area: req.body.area,
            // pointDensity: req.body.pointDensity,
            // classification: req.body.classification,
            // xCoordinate: req.body.xCoordinate,
            // yCoordinate: req.body.yCoordinate,
            // attributes: req.body.attributes,
            // start_at: req.body.start_at,
            // end_at: req.body.end_at,
            // publication_date: req.body.publication_date,
            // funders: req.body.funders,
            // partners: req.body.partners,
            // collectors: req.body.collectors,
            // acknowledgement: req.body.acknowledgement,
            // citation: req.body.citation,
            // license: req.body.license,
            // files: req.body.files,
        })
        metadata.save()
        .then((m)=> {
            console.log(m)
            res.json({metadata: m})
        })
    } catch (error) {
        console.log('api/controller/metadata.controller/saveToDB' + error)
    }
}
async function getMetadata (req, res, next){
    try {
        console.log(`Connected to getMetadata`)
        console.log(req.body)
        // Metadata.find({ "data.name": { $regex: '.*' + req.body.name + '.*' }}).sort(req.body.date)
        Metadata.find({ "data.name": {$regex: req.body.name, $options: 'i'}}).sort(req.body.date)
        .then((m)=>{
            res.json({list: m})
        })
    } catch (error) {
        console.log('api/controller/metadata.controller/getMetadata' + error)
    }
}
async function getMetadataById (req, res, next){
    try {
        console.log(`Connected to getMetadataById`)
        Metadata.findById(req.body._id)
        .then((m)=> {
            console.log(m)
            res.json({metadata: m})
        })
    } catch (error) {
        console.log('api/controller/metadata.controller/getMetadataById' + error)
    }
}
async function getAccountMetadata (req, res, next){
    try {
        console.log(`Connected to getMetadataById`)
        console.log(req.body)
        Metadata.find({writer: req.body.address})
        .then((m)=> {
            console.log(m)
            res.json({list: m})
        })
    } catch (error) {
        console.log('api/controller/metadata.controller/getMetadataById' + error)
    }
}
async function updateToDB (req, res, next){
    try {
        console.log(`Connected to updateToDB`)
        console.log(req.body)
        Metadata.findOneAndUpdate({rootCid: req.body.rootCid}, {data: req.body.data, rootCid: req.body.data.rootCid, receiver: req.body.data.receiver})
        .then( () =>{
            res.json({type: 1})
            // m.data = req.body.data
            // m.rootCid = req.body.data.rootCid
            // m.save()
            // .then((nm) => {
            //     res.json({metadata: nm})
            // })
        })
    } catch (error) {
        console.log('api/controller/metadata.controller/updateToDB' + error)
    }
}
async function deleteMetadataById (req, res, next){
    try {
        console.log(`Connected to deleteMetadataById`)
        console.log(req.body)
        Metadata.deleteOne({_id: req.body._id}).exec()
        .then( () =>{
            res.json({type: 1})
        })
    } catch (error) {
        console.log('api/controller/metadata.controller/deleteMetadataById' + error)
    }
}
async function donateMatic (req, res, next){
    try {
        console.log(`Connected to donateMatic`)
        console.log(req.body)
        let sponsor = {}
        sponsor.sender = req.body.sender
        sponsor.amount = req.body.amount
        Metadata.findOneAndUpdate({_id: req.body.metadata_id}, {$push: { sponsors: sponsor }}).exec()
        .then( () =>{
            res.json({type: 1})
        })
    } catch (error) {
        console.log('api/controller/metadata.controller/donateMatic' + error)
    }
}
async function getSponsorMetadata (req, res, next){
    try {
        console.log(`Connected to getSponsorMetadata`)
        console.log(req.body)
        // Metadata.find({ 'sponsors.name' : req.body.address}, {sponsors : {$elemMatch: {sender: req.body.address}}}).exec()
        Metadata.find({ 'sponsors.name' : req.body.address}).exec()
        .then( m => {
            console.log(m)
            res.json({list: m})
        })
        // let sponsor = {}
        // sponsor.sender = req.body.sender
        // sponsor.amount = req.body.amount
        // Metadata.findOneAndUpdate({_id: req.body.metadata_id}, {$push: { sponsors: sponsor }}).exec()
        // .then( () =>{
        // })
    } catch (error) {
        console.log('api/controller/metadata.controller/getSponsorMetadata' + error)
    }
}

module.exports = {
    saveToDB,
    getMetadata,
    getMetadataById,
    getAccountMetadata,
    updateToDB,
    deleteMetadataById,
    donateMatic,
    getSponsorMetadata
}