const Download = require('../model/download.model')



async function sample (req, res, next){
    try {
        console.log('connected to sample')
        res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/game.controller/sample' + error)
    }
}

async function getDownloads (req, res, next){
    try {
        console.log('connected to getDownloads')
        console.log(req.body)

        Download.getDownloads (req.body, (err, data) => {
            if (err)
                res.status(404).send()
            else
                res.send({downloads: data})
        })
    } catch (error) {
        console.log('api/controller/game.controller/getNews' + error)
    }
}
module.exports = {
    getDownloads,
}