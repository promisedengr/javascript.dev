const express = require('express')
const router = express.Router()
const passport = require('passport');

const PaymentCtrl = require('../controller/payment.controller')


router.route('/getPaymentwallWidget').post(passport.authenticate('jwt', {session: false}), PaymentCtrl.getPaymentwallWidget)
router.route('/checkPaymentwallTransaction').get(PaymentCtrl.checkPaymentwallTransaction)
router.route('/getAccountCoinPurchases').post(passport.authenticate('jwt', {session: false}), PaymentCtrl.getAccountCoinPurchases)


// router.route('/getNews').post(GameCtrl.getNews)
// router.route('/getTerms').post(GameCtrl.getTerms)
// router.route('/getPrivacy').post(GameCtrl.getPrivacy)
// router.route('/getLegal').post(GameCtrl.getLegal)
// router.route('/getCookie').post(GameCtrl.getCookie)
// router.route('/getContactUs').post(GameCtrl.getContactUs)


// router.route('/getRotations').post(GameCtrl.getRotations)
// router.route('/doChangeFamilyName').post(passport.authenticate('jwt', {session: false}), GameCtrl.doChangeFamilyName)


module.exports = router
