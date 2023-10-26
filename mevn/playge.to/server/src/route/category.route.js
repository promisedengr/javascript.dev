const express = require('express')
const router = express.Router()
const passport = require('passport');

// const AccountCtrl = require('../controller/account.controller')
// const ItemCtrl = require('../controller/item.controller')
const CategoryCtrl = require('../controller/category.controller')

router.route('/getCategoryList').post(passport.authenticate('jwt', {session: false}), CategoryCtrl.getCategoryList)


module.exports = router
