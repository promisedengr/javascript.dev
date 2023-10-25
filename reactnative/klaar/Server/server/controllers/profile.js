const db = require('../db')
const monq = require('../monq')
const {dateNowWithoutMsToInt} = require('../helpers/setDataHelper')
const sessions = require('../process/sessions')

module.exports = {
    getSelfProfile: async(req,res) => {
        const user = await db.main.User.getProfile(req.person._id)
        res.result.data = user
    },
    getProfileByUserId: async(req,res) => {
        const userProfile = await db.main.User.getProfile(req.params.userId, req.person._id)
        res.result.data = userProfile
    },
    activateSellerPermision: async(req,res) => {
        if(req.person.auth.role !== 'buyer') throw {httpStatus: 409, message: 'Already have seller permissions'}
        const user = await db.main.User.getById(req.person._id)
        if(!user.fn || !user.ln || !user.bday || !user.phone || !user.email) throw {httpStatus: 406, 
            message: 'To activate seller permissions, you need to complete your profile'
        }
        await db.main.User.updateOne({ _id: user._id }, {
            $set: {
                'auth.role': 'seller'
            }
        })
        await sessions.removeAll(user._id)
    },
    changeProfile: async(req,res) => {
        //dateNowWithoutMsToInt() - 10 yers
        if(req.body.bday > dateNowWithoutMsToInt() - 315360000) throw {httpStatus: 400, message: 'Enter correct birthday date'}
        const user = await db.main.User.getById(req.person._id)
        await user.setData({
            fn: req.body.fn ? req.body.fn.trim() : null,
            ln: req.body.ln ? req.body.ln.trim() : null,
            phone: req.body.phone ? req.body.phone.trim().toLowerCase() : null,
            bday: req.body.bday,
        })
    },
    setPhoto: async(req,res) => {
        const user = await db.main.User.getById(req.person._id)
        const userObj = user.toObject()
        const oldPhotoName = userObj.photo
        user.photo = 'images/users/wait.jpg'
        await user.save()
        await monq.run('setUserPhoto', {
            userId: user.id,
            oldPhotoName,
            imageData: req.body.data,
            mimeType: req.body.mimeType
        })
    },
    getDeliveryAddresses: async(req,res) => {
        const deliveryAddresses = await db.main.User.getDeliveryAddresses(req.person._id)
        res.result.data = {
            deliveryAddresses
        }
    },
    changeAddress: async(req,res) => {
        const index = parseInt(req.params.index)
        const user = await db.main.User.findOne({ _id: req.person._id }, { deliveryAddresses: 1 })
        const data = {
            region: req.body.region.trim(),
            city: req.body.city.trim(),
            street: req.body.street.trim(),
            houseNumber: req.body.houseNumber.trim(),
            squareNumberOrOffice: req.body.squareNumberOrOffice.trim(),
            mailIndex: req.body.mailIndex
        }
        if(user.deliveryAddresses[index]) user.deliveryAddresses[index] = data
        else user.deliveryAddresses.unshift(data)
        await user.save()
    },
    deleteAddress: async(req,res) => {
        const index = parseInt(req.params.index)
        const user = await db.main.User.findOne({ _id: req.person._id }, { deliveryAddresses: 1 })
        if(user.deliveryAddresses[index]) user.deliveryAddresses.splice(index, 0)
        await user.save()
    }
}