const Townhall = require("../model/townhall.model");
const Account = require("../model/account.model");


async function getTownhallData (req, res, next){
    try {
        Townhall.findOne({"details.slug" : req.body.slug}).exec()
        .then((one) => {
            res.json({townhall : one})
        })
        .catch((err) => console.error(err))
    } catch (error) {
        console.log('api/controller/townhall.controller/getTownhallData' + error)
    }
}
async function joinTownhall (req, res, next){
    try {
        Townhall.findOneAndUpdate({ _id: req.body._id }, { $push: { villagers: req.body.villager  } },).then((one) => {
            res.json({townhall: one})
        })
        .catch((err) => console.error(err))
    } catch (error) {
        console.log('api/controller/townhall.controller/joinTownhall' + error)
    }
}

async function createTownHall (req, res, next){
    try {
        
        let data = req.body.data
        var villagers = [];
        villagers.push(req.body._addr)
        // "my, tags are, in here".split(" ,")
        // result
        // [ 'my, tags are, in here' ]
        var master_string = req.body.data.master.replace(/[, ]+/g, "").trim();
        if (master_string != '')
        {
            var array = master_string.split('\n');
            array.map((a) => {villagers.push(a);})
        }
        var warden_string = req.body.data.warden.replace(/[, ]+/g, "").trim();
        if (warden_string != '') {
            var array = warden_string.split('\n');
            array.map((a) => {villagers.push(a);})
        }
        var villagers_id = [];
        for (var i = 0; i < villagers.length; i ++){
            let account = await Account.findOne({address: villagers[i]}).exec();
            if (account)
                villagers_id.push(account._id)
        }
        // let townhall = new Townhall(Object.assign({}, data, { superwarden: req.body._addr }
        //     ,{created_at: new Date()}, {updated_at: new Date()}))
        let townhall = new Townhall({
            superwarden: req.body._addr,
            villagers: villagers_id,
            details: data,
            created_at: new Date(),
            updated_at: new Date()
        })
        await townhall.save().then( async (t) =>{
            // await Account.findOneAndUpdate({address: t.superwarden}, { superwarden: t._id}).exec()
            // await Account.findOneAndUpdate({address: t.superwarden}, { $set: { superwarden: t._id}}, { new: true }).exec()
            res.json({data: t})
        })
    } catch (error) {
        console.log('api/controller/townhall.controller' + error)
    }
}
async function getProposalData (req, res, next){
    try {
        res.json({data: []})
    } catch (error) {
        console.log('api/controller/townhall.controller/getProposalData' + error)
    }
}


async function updateTownHall (req, res, next){
    try {
        let data = req.body.data
        var villagers = [];
        villagers.push(req.body.superwarden)
        var master_string = req.body.data.master.replace(/[, ]+/g, "").trim();
        if (master_string != '')
        {
            var array = master_string.split('\n');
            array.map((a) => {villagers.push(a);})
            
        }
        var warden_string = req.body.data.warden.replace(/[, ]+/g, "").trim();
        if (warden_string != '') {
            var array = warden_string.split('\n');
            array.map((a) => {villagers.push(a);})
        }
        var villagers_id = [];
        for (var i = 0; i < villagers.length; i ++){
            let account = await Account.findOne({address: villagers[i]}).exec();
            if (account)
                villagers_id.push(account._id)
        }
        Townhall.findOneAndUpdate({"details.slug": req.body.slug}, { $pull: {villagers: villagers_id}, details: data, updated_at: new Date()}).then((t) =>{
          res.json({data: t})  
        })
        
        // res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/townhall.controller/updateTownHall' + error)
    }
}
async function getMyTownhall (req, res, next){
    try {
        Townhall.findOne({superwarden: req.body._addr}).then((t) =>{
          res.json({data: t})  
        })
        
        // res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/townhall.controller' + error)
    }
}
async function getTownhallList (req, res, next){
    try {
        let query = {}
        if (req.body.search.name)
            query['details.name'] = new RegExp(req.body.search.name, 'i') 
        if ((req.body.search.type) && (req.body.search.type != 'all'))
            query['details.categories'] = req.body.search.type
        Townhall.find(query).populate({
            path: 'villagers',
        }).then((list) =>{
          res.json({data: list})  
        })
    } catch (error) {
        console.log('api/controller/townhall.controller' + error)
    }
}
async function checkSlugName (req, res, next){
    try {
        Townhall.count({"details.slug": req.body.slug}).exec()
        .then((count) =>{
            res.json({count:count})
        })
    } catch (error) {
        console.log('api/controller/townhall.controller' + error)
    }
}
// async function sample (req, res, next){
//     try {
//         // let user = new User({
//         //     address: 'sadwdwdw',
//         //     role: 1,
//         // })
//         await user.save()
//         User.find({}).then((list) => {
//             console.log(list)
//         })

//         let a = 90
//         res.json({list: 'okay'})
//     } catch (error) {
//         console.log('api/controller/townhall.controller' + error)
//     }
// }
module.exports = {
    createTownHall,
    getMyTownhall,
    getTownhallList,
    getProposalData,
    updateTownHall,
    getTownhallData,
    joinTownhall,
    checkSlugName
}