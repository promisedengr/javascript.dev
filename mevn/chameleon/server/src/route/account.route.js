const express = require('express')
const router = express.Router()
const AccountCtrl = require('../controller/account.controller')

router.route('/getAccountData').post(AccountCtrl.getAccountData)
router.route('/getProfile').post(AccountCtrl.getProfile)
router.route('/updateProfile').post(AccountCtrl.updateProfile)




module.exports = router
