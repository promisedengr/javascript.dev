

const User = require("../model/user.model");
const axios = require("axios")

async function userLookUp (req, res, next){
    try {
        console.log('connected to userLookUp')
        const apiKey = 'sk_49c5ad9208c03e6b0d3e4f719592efc9';
        console.log(req.query.email)
        if (req.query.email) {
            // if (isEmail(req.query.email)) {

            // } else {

            // }
            const url = `https://person.clearbit.com/v2/people/find?email=${req.query.email}`;

            axios.get(url, {headers: {Authorization: `Bearer ${apiKey}`}})
            .then( async (response) => {
                console.log(response.data);
                User.findOne({email: req.query.email})
                .then( async (u) => {
                    if (u) {
                        // User.findOneAndUpdate()
                        u.name = response.data.name.fullName
                        u.location = response.data.location
                        u.image = response.data.avatar
                        u.count += 1 
                        await u.save()
                        .then((nu) => {
                            res.json(nu)
                        })
                    } else {
                        var user = new User({
                            name: response.data.name.fullName,
                            location: response.data.location,
                            image: response.data.avatar,
                            email: req.query.email,
                            count: 1
                        })
        
                        await user.save().then((u) => {
                            res.json(u)

                        })
                    }
                })
                .catch((error) => {
                    res.status(404).json({error: 'An error in Clearbit api'})
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                res.status(404).json({error: 'An internal server error'})
            });
        } else {
            res.status(404).json({error: 'input email'})
        }
       




        // // using node clearbit modules
        // var key = "sk_49c5ad9208c03e6b0d3e4f719592efc9"
        // var clearbit = require('clearbit')(key);
        // var Person   = clearbit.person;

        // clearbit.Person.find({email: 'rahul@superhuman.com', company: 'Clearbit', stream: true})
        // .then(function (person) {
        //     console.log('clearbit')
        //     console.log(person)
        //     console.log('Name: ', person.name.fullName);
        //   });
        // res.json({list: 'okay'})

    } catch (error) {
        console.log('api/controller/user.controller/userLookUp' + error)
    }
}

async function userList (req, res, next){
    try {
        console.log('connected to userList')
        User.find().sort('-count').limit(10)
        .then((users) => {
            res.json({users: users})
        })
        .catch((error) => {
            res.status(404).json({error: 'An internal server error'})
        });
    } catch (error) {
        console.log('api/controller/user.controller/userList' + error)
    }
}













async function sample (req, res, next){
    try {
        console.log('connected to sample')
        res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/user.controller/sample' + error)
    }
}
module.exports = {
    userLookUp,
    userList
}