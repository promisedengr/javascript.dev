const {Schema} = require('mongoose')
const {dateNowWithoutMsToInt} = require('../helpers/setDataHelper')
const ObjectId = require('mongoose').Types.ObjectId
const stripeManager = require('../process/stripeManager')

const requiredFieldsSchema = new Schema({
    colors: {type: Boolean, default: false},
    sizes: {type: Boolean, default: false}
}, { _id: false, _v: false })
const categorySchema = new Schema({
    name: {type: String, minlength: 3, maxlength: 50, unique: true, match: /^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$/},
    subcategories: [ {type: String, minlength: 3, maxlength: 50, match: /^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$/} ],
    requiredFields: { type: requiredFieldsSchema },
    apperDate: {type: Number, default: dateNowWithoutMsToInt(), select: false},
    __v: {type: Number, select: false}
})
categorySchema.statics = {
    create: async function(name, subcategories = [], requiredFields) {
        for(let i = 0; i < subcategories.length; i++) subcategories[i] = subcategories[i].toLowerCase().trim().replace(/[ ]+/ig, ' ')
        let category = new this({
            _id: ObjectId(),
            name: name.toLowerCase().trim().replace(/[ ]+/ig, ' '),
            subcategories,
            requiredFields,
            apperDate: dateNowWithoutMsToInt()
        })
        await stripeManager.prdoucts.create(category)
        category = await category.save()
        .then(savedCategory => {
            return savedCategory
        })
        return category
    },
    getById: async function(id) {
        const category = await this.findOne({ _id: id })
        if(!category) throw {httpStatus: 404, message: 'Category not found'}
        return category
    },
    getList: async function(skip, limit = 15) {
        const categories = await this.find()
        .sort({ name: 1 })
        .skip(skip).limit(limit)
        if(!categories) return []
        return categories
    }
}
categorySchema.set('toJSON', { 
    getters: true, 
    transform: function(doc, ret) { 
        delete ret.id
    }
})
module.exports = categorySchema