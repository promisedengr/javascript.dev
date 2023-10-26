const express = require('express')
const router = express.Router()
const GameRoute = require('./game.route')
const UserRoute = require('./user.route')
const DownloadRoute = require('./download.route')
const DonationRoute = require('./donation.route')
const ItemRoute = require('./item.route')
const CategoryRoute = require('./category.route')
const PaymentRoute = require('./payment.route')

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
let config = require('../config/jwt.config');

var User = require('../model/user.model')
var opts = {};
opts.secretOrKey = config.secret;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

passport.use(new JwtStrategy(opts, function (payload, done){
    User.findById(payload.id, function(err, user) {
        console.log('current user')
        console.log(user)
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}))

router.use('/game', GameRoute)
router.use('/user', UserRoute)
router.use('/download', DownloadRoute)
router.use('/item', ItemRoute)
router.use('/category', CategoryRoute)
router.use('/payment', PaymentRoute)
router.use('/donation', DonationRoute)



module.exports = router