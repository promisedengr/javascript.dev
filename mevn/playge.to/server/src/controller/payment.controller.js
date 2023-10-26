const Paymentwall = require('paymentwall');

const User = require("../model/user.model");
const Transaction = require("../model/transaction.model");


// https://github.com/paymentwall/paymentwall-node


var axios = require('axios')
Paymentwall.Configure(
    Paymentwall.Base.API_VC,
    '8c8962878af4e733f1a9e4b3e72a9b36', // = key in other // app key
    '848ea11edaa631a5cc37c6ed388c4041' // = uid in other // secret key here
);

async function sample (req, res, next){
    try {
        
        console.log('connected to sample')
        res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/game.controller/sample' + error)
    }
}
async function getPaymentwallWidget (req, res, next){
    try {
        var widget = new Paymentwall.Widget (
            req.user.name,
            'p1_1',
            [],
            {'email': req.user.email}
        );
        if (widget.getUrl())
            res.json({uri: widget.getUrl()})
        else
            res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/payment.controller/getPaymentwallWidget' + error)
    }
}

async function checkPaymentwallTransaction(req, res, next) {
    console.log(req.query)

    console.log((req.headers['x-forwarded-for'] || '').split(',').pop().trim() || req.socket.remoteAddress)
    // baseString = "uid="+params.uid+"currency="+params.currency+"type="+params.type+"ref="+params.ref
    var pingback = new Paymentwall.Pingback(`uid=${req.query['uid']}&currency=${req.query['currency']}&type=${req.query['type']}&ref=${req.query['ref']}&sig=${req.query['sig']}`, (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || req.socket.remoteAddress);
    var state = 0 // 0: not set 1: deliver 2: withdraw 3: other
    if (pingback.validate()) {
        var productId = pingback.getProduct().getId();
        if (pingback.isDeliverable()) {
            state = 1
            console.log('deliver the product')
        } else if (pingback.isCancelable()) {
            state = 2
            console.log('withdraw the product')
        } else {
            state = 3
        }
        // var userId = pingback.getProduct().getUserId();
        var username = req.query['uid']
        console.log(username)
        User.findByName(username, (err, user) => {
            if (user) {
                user.coin = parseInt(user.coin) + parseInt(req.query['currency'])
                User.updateById(user.id, user, async (err, result) => {
                    if (result) {
                        var transaction = {}
                        transaction.username = user.name
                        transaction.type = req.query['type']
                        transaction.date = new Date()
                        transaction.state = state
                        transaction.ref = req.query['ref']
                        transaction.coin = req.query['currency']

                        Transaction.create(transaction, (err, result) => {
                            console.log('The transaction is made')
                        })
                    }
                })
            } else
                console.log('User is not defined')
        })
        res.send('Ok')
    } else {
        console.log(pingback.getErrorSummary());
        res.send(pingback.getErrorSummary())
    }
}
async function getAccountCoinPurchases (req, res, next){
    try {
        console.log('getAccountCoinPurchases')
        Transaction.findByUsername(req.user.name, (err, result) => {
            console.log(result)
            if (res)
                res.json({transactions : result})
            else
                res.json({message: 'no purchases'})

        })
    } catch (error) {
        console.log('api/controller/payment.controller/getAccountCoinPurchases' + error)
    }
}
module.exports = {
    getPaymentwallWidget,
    checkPaymentwallTransaction,
    getAccountCoinPurchases
  }