const Donation = require('../model/donation.model')



async function sample (req, res, next){
    try {
        console.log('connected to sample')
        res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/game.controller/sample' + error)
    }
}

async function getDonationList (req, res, next){
    try {
        console.log('connected to getDonationList')
        console.log(req.body)

        Donation.getAll (req.body, (err, data) => {
            if (err)
                res.status(404).send()
            else{
                console.log(data)
                res.send({donations: data})
            }
        })
    } catch (error) {
        console.log('api/controller/donation.controller/getDonationList' + error)
    }
}
module.exports = {
    getDonationList,
}