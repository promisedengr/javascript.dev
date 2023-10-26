const Announce = require("../model/announce.model");
const Townhall = require("../model/townhall.model");
const moment = require('moment')

async function createBroadcast (req, res, next){
    try {
        // let 
        let announce = new Announce({
            slug: req.body.slug,
            creator: req.body.creator,
            cid: req.body.cid,
            title: req.body.announce.title,
            summary: req.body.announce.summary,
            attachment: req.body.announce.attachment,
            importance:req.body.announce.importance,
            timezone: req.body.announce.timezone,
            expire_at: req.body.announce.date,

        })
        announce.save().then((a) => {
            res.json({announce: a})
        })
    } catch (error) {
        console.log('api/controller/announce.controller/createBroadcast' + error)
    }
}
async function getAnnouncementList (req, res, next){
    try {
        let query = {}
        query.slug = req.body.slug;
        if (req.body.index == 'closed' || req.body.index == 'open'){
            Announce.find(query).populate('creator').sort('-created_at').exec()
            .then((list)=>{
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
                let closedList = []
                let openList = []
                list.map((i, index) => {
                    let userTime = moment(i.expire_at).utcOffset(i.timezone.offset).endOf('day')
                    let userTimeOffset = moment().utcOffset(i.timezone.offset).utcOffset() * 60 * 1000
                    let userTimeValue = userTime - userTimeOffset
                    let now = new Date()
                    let localTimeOffset = now.getTimezoneOffset() * 60 * 1000;
                    let localTimeValue = now.getTime() + localTimeOffset
                    if (userTimeValue >= localTimeValue)
                        openList.push(i)
                    else
                        closedList.push(i)
                })
                if (req.body.index == 'closed')
                    res.json({list: closedList})
                else
                    res.json({list: openList})
            })
        } else {
            if (req.body.index == 'important')
                query.importance = true
            Announce.find(query).populate('creator').sort('-created_at').exec()
            .then((list)=>{
                res.json({list: list})
            })
        }
    } catch (error) {
        console.log('api/controller/announce.controller/getAnnouncementList' + error)
    }
}
async function getAnnounceDate (req, res, next){
    try {
        // let user = new User({
        //     address: 'sadwdwdw',
        //     role: 1,
        // })
        
        Announce.findById(req.body._id).populate('creator').exec()
        .then((a)=>{
            res.json({announce: a})

        })
        
    } catch (error) {
        console.log('api/controller/user.controller' + error)
    }
}
async function deleteAnnouncement (req, res, next){
    try {
        Announce.deleteOne({_id: req.body._id}).exec()
        .then(()=>{
            res.json({})
        })
    } catch (error) {
        console.log('api/controller/announce.controller/' + error)
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
        console.log('api/controller/announce.controller/' + error)
    }
}
module.exports = {
    createBroadcast,
    getAnnouncementList,
    getAnnounceDate,
    deleteAnnouncement
}