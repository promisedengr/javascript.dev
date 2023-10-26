const express = require('express')
const router = express.Router()
const AnnounceCtrl = require('../controller/announce.controller')

router.route('/createBroadcast').post(AnnounceCtrl.createBroadcast)
router.route('/getAnnouncementList').post(AnnounceCtrl.getAnnouncementList)
router.route('/getAnnounceDate').post(AnnounceCtrl.getAnnounceDate)
router.route('/deleteAnnouncement').post(AnnounceCtrl.deleteAnnouncement)







module.exports = router
