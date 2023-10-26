const express = require('express')
const router = express.Router()
const TownhallCtrl = require('../controller/townhall.controller')

router.route('/createTownHall').post(TownhallCtrl.createTownHall)
router.route('/getMyTownhall').post(TownhallCtrl.getMyTownhall)
router.route('/getTownhallList').post(TownhallCtrl.getTownhallList)
// router.route('/getProposalData').post(TownhallCtrl.getProposalData)
router.route('/updateTownHall').post(TownhallCtrl.updateTownHall)
router.route('/getTownhallData').post(TownhallCtrl.getTownhallData)
router.route('/joinTownhall').post(TownhallCtrl.joinTownhall)
router.route('/checkSlugName').post(TownhallCtrl.checkSlugName)








module.exports = router
