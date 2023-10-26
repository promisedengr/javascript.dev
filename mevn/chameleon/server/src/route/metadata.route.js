const express = require('express')
const router = express.Router()
const MetadataCtrl = require('../controller/metadata.controller')
router.route('/saveToDB').post(MetadataCtrl.saveToDB)
router.route('/getMetadata').post(MetadataCtrl.getMetadata)
router.route('/getMetadataById').post(MetadataCtrl.getMetadataById)
router.route('/getAccountMetadata').post(MetadataCtrl.getAccountMetadata)
router.route('/updateToDB').post(MetadataCtrl.updateToDB)
router.route('/deleteMetadataById').post(MetadataCtrl.deleteMetadataById)
router.route('/donateMatic').post(MetadataCtrl.donateMatic)
router.route('/getSponsorMetadata').post(MetadataCtrl.getSponsorMetadata)





module.exports = router
