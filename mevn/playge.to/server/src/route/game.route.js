const express = require('express')
const router = express.Router()
const passport = require('passport');

const GameCtrl = require('../controller/game.controller')


router.route('/checkServerStatus').post(GameCtrl.checkServerStatus)
router.route('/getGameStatistics').post(GameCtrl.getGameStatistics)
router.route('/getNews').post(GameCtrl.getNews)
router.route('/getTerms').post(GameCtrl.getTerms)
router.route('/getPrivacy').post(GameCtrl.getPrivacy)
router.route('/getLegal').post(GameCtrl.getLegal)
router.route('/getCookie').post(GameCtrl.getCookie)
router.route('/getContactUs').post(GameCtrl.getContactUs)


router.route('/getRotations').post(GameCtrl.getRotations)
router.route('/doChangeFamilyName').post(passport.authenticate('jwt', {session: false}), GameCtrl.doChangeFamilyName)


module.exports = router
