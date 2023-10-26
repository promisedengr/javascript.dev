const express = require('express')
const router = express.Router()
const UserCtrl = require('../controller/user.controller')
// router.route('').post(UserCtrl.sample)
router.route('/saveUserData').post(UserCtrl.saveUserData)
router.route('/getUserData').post(UserCtrl.getUserData)


module.exports = router
