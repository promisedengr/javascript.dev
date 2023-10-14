const express = require('express')
const router = express.Router()

const UserCtrl = require('../controller/user.controller')

router.route('/lookup').post(UserCtrl.userLookUp)
router.route('/list').post(UserCtrl.userList)



module.exports = router
