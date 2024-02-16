var express = require("express");
var router = express.Router();
const auth = require('./controller/auth')

const { create, read, login, isAdmin, filter_user, action_user, get_user, set_avata } = require('./controller/user')
router.get('/user', read)
router.post('/user', create)
router.post('/login', login)
router.post('/is_admin', auth, isAdmin)
router.post('/filter_user', filter_user)
router.post('/action_user', auth, action_user)
router.post('/get_user', auth, get_user)
router.post('/set_avata', auth, set_avata)

router.post('/sess_test', auth, (req, res) => {
    console.log(req.user)
    res.send('ok')
})

const transfer = require('./controller/move')
router.post('/send_assets', auth, transfer)
const { get_rate, balance } = require('./controller/balance')
router.post('/get_balance', auth, balance)
router.post('/get_rate', auth, get_rate)

const { all_tranaction, read_tranaction } = require('./controller/trasaction')
router.post('/trasaction', auth, read_tranaction)
router.get('/trasaction', all_tranaction)

const { send_support } = require('./controller/support')
router.post('/send_support', auth, send_support)

module.exports = router;