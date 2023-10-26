// const User = require("../model/user.model");
const Account = require("../model/account.model");
const Townhall = require("../model/townhall.model");

async function updateProfile (req, res, next){
    try {
        Account.findOneAndUpdate({address : req.body._addr}, req.body.account).then(async (i) =>{
            res.json({account: i})
        })
    } catch (error) {
        console.log('api/controller/user.controller/updateProfile' + error)
    }
}
async function getProfile (req, res, next){
    try {
        Account.findOne({address : req.body._addr}).then(async (i) =>{
            // console.log(i._id.toString())
            if (i.id){
                Townhall.find({villagers: i._id}).exec()
                .then((list) => {
                    // let a = 10
                    res.json({townhalls: list, account: i})
                })
            }
            // if (i){
            //     res.json({account: i})
            // } else {
            //     let account = new Account({
            //         address: req.body._addr,
            //     })
            //     await account.save().then((a) => {
            //         res.json({account: a})
            //     })
            // }
        })
    } catch (error) {
        console.log('api/controller/user.controller/getProfile' + error)
    }
}

async function getAccountData (req, res, next){
    try {
        Account.findOne({address : req.body._addr}).then(async (i) =>{
            if (i){
                Townhall.find({villagers: i._id}).select('_id superwarden details.avatar details.slug').exec()
                .then((list) => {
                    res.json({account: i, townhalls : list})
                })
                .catch((err) => console.error(err))
            } else {
                let account = new Account({
                    address: req.body._addr,
                })
                await account.save().then((a) => {
                    res.json({account: a, townhalls: []})
                })
            }
        })
    } catch (error) {
        console.log('api/controller/user.controller/getData' + error)
    }
}

async function sample (req, res, next){
    try {
        // let user = new User({
        //     address: 'sadwdwdw',
        //     role: 1,
        // })
        await user.save()
        User.find({}).then((list) => {
            console.log(list)
        })

        let a = 90
        res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/user.controller/sample' + error)
    }
}
module.exports = {
    getAccountData,
    getProfile,
    updateProfile
}