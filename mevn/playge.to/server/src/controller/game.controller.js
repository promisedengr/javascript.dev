const User = require("../model/user.model");
const News = require("../model/news.model");
const Config = require("../model/config.model")
var fs = require('fs');
const path = require('path');


const mssql = require('../utils/mssql');
var io = require('socket.io-client');

async function sample (req, res, next){
    try {
        
        console.log('connected to sample')
        res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/game.controller/sample' + error)
    }
}
async function checkServerStatus (req, res, next){
    try {
        console.log('connected to checkServerStatus')
        Config.getAll( (err, data) => {
            if (data) {
                res.send({config: data[0]})
            } else {
                res.status(404).send()
            }
        });
    } catch (error) {
        console.log('api/controller/game.controller/sample' + error)
    }
}

async function getGameStatistics (req, res, next){
    try {
        User.getCountByCategory (0, async (_err, _count) => {
            if (_count) {
                var _result = await mssql._getOnlinePlayerCount(0);
                console.log('the result from Global mssql')
                console.log(_result)
                var _socket = await io('https://192.168.100.11:7001');
                console.log('check 1', _socket.connected);
                var _server_data = {}
                if (_result)
                    _server_data._players = _result[0].OnlinePlayers
                else
                    _server_data._players = 0
                _server_data._accounts = _count.count
                _server_data._status = _socket.connected
                // let _count = await User.getCountByCategory(0);
                // console.log(_count)
                User.getCountByCategory (1, async (err, count) => {
                    if (count) {
                        var result = await mssql._getOnlinePlayerCount(1);
                        console.log('the result from Sea mssql')
                        console.log(result)
                        var socket = await io('https://192.168.100.11:7001');
                        var server_data = {}
                        if (result)
                            server_data.players = result[0].OnlinePlayers
                        else
                            server_data.players = 0
                        server_data.accounts = count.count
                        server_data.status = socket.connected
                        res.json({_server: _server_data, server: server_data})
                    } else
                    res.status(404).send()
                })
            } else
                res.status(404).send()
        })

    } catch (error) {
        console.log('api/controller/game.controller/getGameStatistics' + error)
    }
}

async function getNews (req, res, next){
    try {
        console.log('connected to getNews')
        console.log(req.body)

        News.getNews(req.body, (err, data) => {
            if (err)
                res.status(404).send()
            else
                res.send({news: data})
        })
    } catch (error) {
        console.log('api/controller/game.controller/getNews' + error)
    }
}
async function getTerms (req, res, next){
    try {
        console.log('connected to getTerms')
        var content = fs.readFileSync(path.join(__dirname + '../../../data/news/terms.html'), "utf-8").toString();
        console.log(content)
        res.json({content: content})
    } catch (error) {
        console.log('api/controller/game.controller/getTerms' + error)
    }
}
async function getPrivacy (req, res, next){
    try {
        console.log('connected to getPrivacy')
        var content = fs.readFileSync(path.join(__dirname + '../../../data/news/privacy.html'), "utf-8").toString();
        console.log(content)
        res.json({content: content})
        // res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/game.controller/getPrivacy' + error)
    }
}
async function getLegal (req, res, next){
    try {
        console.log('connected to getLegal')
        var content = fs.readFileSync(path.join(__dirname + '../../../data/news/legal.html'), "utf-8").toString();
        console.log(content)
        res.json({content: content})
        // res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/game.controller/getLegal' + error)
    }
}
async function getCookie (req, res, next){
    try {
        console.log('connected to getCookie')
        var content = fs.readFileSync(path.join(__dirname + '../../../data/news/cookie.html'), "utf-8").toString();
        console.log(content)
        res.json({content: content})
        // res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/game.controller/getCookie' + error)
    }
}
async function getContactUs (req, res, next){
    try {
        console.log('connected to getContactUs')
        var content = fs.readFileSync(path.join(__dirname + '../../../data/support/contactUs.html'), "utf-8").toString();
        console.log(content)
        res.json({content: content})
        // res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/game.controller/getCookie' + error)
    }
}
async function getRotations (req, res, next){
    try {
        console.log('connected to getRotations')
        // var cookie = await require('../../data/news/cookie')
        var _result = await mssql._getRotations(0)
        var result = await mssql._getRotations(1)

        console.log(result)
        if (result)
            res.json({_rotations: _result, rotations: result})
        else
            res.status(404).send()
    } catch (error) {
        console.log('api/controller/game.controller/getRotations' + error)
    }
}
async function doChangeFamilyName (req, res, next){
    try {
        console.log('connected to doChangeFamilyName')
        console.log(req.body)
        // var cookie = await require('../../data/news/cookie')
        User.findByNameAndNetType(req.body, async (err, user)=> {
            if (user) {
                if (user.coin > 4) {
                    let familyName = await mssql._getNamePlayer(req.user.name)
                    if (familyName.length > 0) {
                        if (familyName[0].NAME == req.body.oldName) {
                            var commander_id = familyName[0].COMMANDER_ID
                            var result = await mssql._doChangeFamilyName(req.user.name, commander_id, req.body.newName, user.netType)
                            console.log('result from mssql of _doChangeFamilyName')
                            console.log(result[0][''])
                            if (result[0][''] == 0) {
                                user.coin = user.coin - 5
                                User.updateById(user.id, user, async (err, result) => {
                                    if (result) {
                                        res.json({message: 'success'})
                                    } else {
                                        console.log('Something went wrong on mysql server.')
                                        res.json({message: 'An Internal Error.'})
                                    }
                                })
                            } else if (result[0][''] == -1005) {
                                res.json({message: 'The family name already exist'})
                            } else  if (result[0][''] == -1006) {
                                res.json({message: 'The new family name has special character'})
                            } else {
                                res.json({message: 'Something went wrong when updating family name.'})
                            }
                        } else
                            res.json({message: `You have the wrong family name.`})
                    } else
                        res.json({message: `You don't have family name.`})
                } else
                    res.json({message: `You have the lack of coin.`})
                
            } else
                res.json({message: `You have the wrong user info.`})
        })
        
    } catch (error) {
        console.log('api/controller/game.controller/doChangeFamilyName' + error)
    }
}
module.exports = {
    checkServerStatus,
    getGameStatistics,
    getNews,
    getTerms,
    getPrivacy,
    getLegal,
    getCookie,
    getContactUs,
    getRotations,
    doChangeFamilyName
}