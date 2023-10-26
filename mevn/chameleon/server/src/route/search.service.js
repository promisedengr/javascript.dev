const express = require('express');
const searchRoutes = express.Router();
const Townhall = require('../model/townhall.model')
const Account = require('../model/account.model')
searchRoutes.route('/slugName').get(async function (req, res) {
    Townhall.count({"details.slug" : req.query.s}).exec()
    .then((count) =>{
        console.log('count')

        console.log(count)
        res.json({count:count})
    })
});
searchRoutes.route('/townhallName').get(async function (req, res) {
    Townhall.count({"details.name" : req.query.s}).exec()
    .then((count) =>{
        console.log(count)
        res.json({count:count})
    })
});
searchRoutes.route('/accountName').get(async function (req, res) {
    Account.count({name : req.query.s}).exec()
    .then((count) =>{
        console.log(count)
        res.json({count:count})
    })
});


module.exports = searchRoutes;