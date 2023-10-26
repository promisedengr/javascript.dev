const User = require("../model/user.model");

async function sample (req, res, next){
    try {
        res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/user.controller/sample' + error)
    }
}
async function saveUserData (req, res, next){
    try {
        // res.json({list:'okay'})
        User.findOne({address: req.body.address})
        .then( async (u) => {
            if (u) {
                // User.findOneAndUpdate()
                u.pinataKey = req.body.pinataKey
                u.pinataSecret = req.body.pinataSecret
                await u.save()
                .then((nu) => {
                    res.json({user: nu, type: 2})
                })
            } else {
                var user = new User({
                    address: req.body.address,
                    pinataKey: req.body.pinataKey,
                    pinataSecret: req.body.pinataSecret
                })
                await user.save().then((u) => {
                    res.json({user: u, type: 1})
                })
            }
        })

        // console.log(req.body)
        // res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/user.controller/saveUserData' + error)
    }
}
async function getUserData (req, res, next){
    try {
        // console.log('ppppppppp')
        User.findOne({address: req.body._add})
        .then((u) => {
            if (u) {
                res.send(u)
            } else {
                var user = new User({address: req.body._add})
                user.save()
                .then((u) => {
                    res.send(u)
                })
            }
        })
    } catch (error) {
        console.log('api/controller/user.controller/getUserData' + error)
    }
}
module.exports = {
    saveUserData,
    getUserData
}