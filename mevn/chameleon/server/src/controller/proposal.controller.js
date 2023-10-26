const Announce = require("../model/announce.model");
const Townhall = require("../model/townhall.model");

const Proposal = require("../model/proposal.model");
const moment = require('moment');


async function createProposal (req, res, next){
    try {
        let obj ={}
        obj.slug = req.body.slug
        obj.creator = req.body._id
        obj.cid = req.body.cid
        if (req.body.data.f_start_date_at && req.body.data.f_start_time_at && req.body.data.f_end_date_at && req.body.data.f_end_time_at){
            obj.f_start_at = await makeDate(req.body.data.f_start_date_at, req.body.data.f_start_time_at)
            obj.f_end_at = await makeDate(req.body.data.f_end_date_at, req.body.data.f_end_time_at)
        }
        if (req.body.data.s_start_date_at && req.body.data.s_start_time_at && req.body.data.s_end_date_at && req.body.data.s_end_time_at){ // if there is second round, set for the second round
            obj.s_start_at = await makeDate(req.body.data.s_start_date_at, req.body.data.s_start_time_at)
            obj.s_end_at = await makeDate(req.body.data.s_end_date_at, req.body.data.s_end_time_at)
        }
        let proposal = new Proposal(Object.assign(obj, req.body.data, {created_at: new Date()}))
        proposal.save().then(async (p) => {
            await refreshProposalStatus(p);
            res.json({proposal: p})
        })

    } catch (error) {
        console.log('api/controller/announce.controller/createBroadcast' + error)
    }
}

function makeDate(date, time){
    // console.log(`${date}T${time.HH}:${time.mm}:00.000Z`)
    return `${date}T${time.HH}:${time.mm}:00.000Z`
}
function groupByVoteOption(indexArray, voteData){
    let array = []
    indexArray.map((i)=>{
        let obj = {}
        obj.option = i
        obj.amount = 0
        voteData.map(v =>{
            if (v.option == i){
                obj.amount += v.balance
                obj.symbol = v.symbol
            }
        })
        array.push(obj)
    })
    array.sort(function(a, b) {
        return b.amount - a.amount;
    });
    return array
}
async function refreshProposalStatus(proposal){
    try {
        let now = new Date()
        let localTimeOffset = now.getTimezoneOffset() * 60 * 1000;
        let localTimeValue = now.getTime() + localTimeOffset
        let serverTimeOffset = moment().utcOffset(proposal.timezone.offset).utcOffset() * 60 * 1000
        if (proposal.s_options.length < 1){ // still not set the second round or no second round
            let start_at_f = new Date(proposal.f_start_at);
            let startTimeValue = start_at_f.getTime() - serverTimeOffset + localTimeOffset
            let end_at_f = new Date(proposal.f_end_at);
            let endTimeValue = end_at_f.getTime() - serverTimeOffset + localTimeOffset
            let toStart = startTimeValue - localTimeValue
            // console.log(serverTimeOffset)
            if (toStart > 0){ // expecting
                proposal.status = 0
            } else {
            // console.log(toStart)

                if (proposal.voters.length > 0){ // if there is voting data, save the voting result
                    let array = await  groupByVoteOption(proposal.options, proposal.voters)
                    proposal.result = array
                }
                if (localTimeValue > endTimeValue) {// first round is ended
                    if (proposal.s_end_at){ // if there is second round, set for the second round
                        proposal.s_voters = []
                        proposal.s_result = []
                        proposal.s_options = []
                        let options = []
                        for (var j = 0 ; j < 2; j++){
                            options.push(proposal.result[j].option)
                        }
                        proposal.s_options = options
                        proposal.status = 0
                    }else{ // voting is ended.
                        proposal.status = 2
                    }
                } else {
                    proposal.status = 1
                }
            }
        } else { // the second round
            let start_at_f = new Date(proposal.s_start_at);
            let startTimeValue = start_at_f.getTime() - serverTimeOffset + localTimeOffset
            let end_at_f = new Date(proposal.s_end_at);
            let endTimeValue = end_at_f.getTime() - serverTimeOffset + localTimeOffset
            let toStart = startTimeValue - localTimeValue
            if (toStart > 0){ // expecting
                proposal.status = 0
            } else {
                if (proposal.s_voters.length > 0){ // if there is voting data, save the voting result
                    let array = await  groupByVoteOption(proposal.s_options, proposal.s_voters)
                    proposal.s_result = array
                }
                // console.log(end_at_f)
                console.log(now)

                if (localTimeValue > endTimeValue ){

                    proposal.status = 2
                } else {
                proposal.status = 1
                }
            }
        }
        await proposal.save({new: true})

    } catch (error) {
        console.log('api/controller/announce.controller/refreshProposalStatus' + error)
    }

}

async function getProposalList (req, res, next){
    try {
        // await refreshProposalStatus(req.body.slug);
        let proposals =  await Proposal.find({slug: req.body.slug, $or: [{ status: 0 }, { status: 1 }] }).exec();
        proposals.map(async (p)=>{
            await refreshProposalStatus(p);
        })

        let query = {}
        query.slug = req.body.slug;
        if (req.body.index > 0){
            query.status = req.body.index
        } else if (req.body.index == 0){
            query.importance = true
        }
        Proposal.find(query).populate('creator').sort('-created_at').exec()
        .then((list)=>{
            res.json({list: list})
        })
    } catch (error) {
        console.log('api/controller/announce.controller/getAnnouncementList' + error)
    }
}

async function getProposalData (req, res, next){
    try {
        Proposal.findById(req.body._id).populate('creator').exec()
        .then(async (p)=>{
            await refreshProposalStatus(p)

            res.json({proposal: p})
        })
    } catch (error) {
        console.log('api/controller/proposal.controller/getProposalData' + error)
    }
}

async function deleteProposal (req, res, next){
    try {
        Proposal.deleteOne({_id: req.body._id}).exec()
        .then(()=>{
            res.json({})
        })
    } catch (error) {
        console.log('api/controller/proposal.controller/' + error)
    }
}
async function sendVote (req, res, next){
    try {
        console.log(req.body)
        if (req.body.round == 1){
            Proposal.findByIdAndUpdate(req.body._id, { $push: {voters : {$each: req.body.data}}}).exec()
            .then(async p =>{
                // console.log(p)
                // await refreshProposalStatus();
                res.json({updated: true})
            })
        } else {
            Proposal.findByIdAndUpdate(req.body._id, { $push: {s_voters : {$each: req.body.data}}}).exec()
            .then(async p =>{
                // console.log(p)
                // await refreshProposalStatus();
                res.json({updated: true})
            })
        }

    } catch (error) {
        console.log('api/controller/proposal.controller/sendVote' + error)
    }
}
async function saveResultCID (req, res, next){
    try {
        Proposal.findByIdAndUpdate(req.body._id, { resultCID: req.body.cid}).exec()
        .then(async p =>{
            res.json({updated: true})

        })
    } catch (error) {
        console.log('api/controller/proposal.controller/' + error)
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
        console.log('api/controller/proposal.controller/' + error)
    }
}
module.exports = {
    createProposal,
    getProposalList,
    getProposalData,
    deleteProposal,
    sendVote,
    saveResultCID
}