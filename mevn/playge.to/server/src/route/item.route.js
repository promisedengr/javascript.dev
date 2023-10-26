const express = require('express')
const router = express.Router()
const passport = require('passport');
// require('../middleware/passport')(passport);

const ItemCtrl = require('../controller/item.controller')


router.route('/getItemList').post(passport.authenticate('jwt', { session: false}), ItemCtrl.getItemList)
router.route('/doBuyItem').post(passport.authenticate('jwt', {session: false}), ItemCtrl.doBuyItem)

module.exports = router
