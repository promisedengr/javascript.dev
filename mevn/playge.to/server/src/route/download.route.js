const express = require('express')
const router = express.Router()
// const AccountCtrl = require('../controller/account.controller')
// const ItemCtrl = require('../controller/item.controller')
const DownloadCtrl = require('../controller/download.controller')

router.route('/getDownloads').post(DownloadCtrl.getDownloads)



module.exports = router
