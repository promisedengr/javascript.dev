const express = require('express')
const router = express.Router()
const passport = require('passport');

const DonationCtrl = require('../controller/donation.controller')

router.route('/getDonationList').post(passport.authenticate('jwt', {session: false}), DonationCtrl.getDonationList)



module.exports = router
