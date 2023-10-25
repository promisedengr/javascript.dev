const db = require('../db')
const categoryController = {
    getById: async(req,res) => {
        const category = await db.main.Category.getById(req.params.categoryId)
        res.result.data = category
    },
    getList: async(req,res) => {
        const categories = await db.main.Category.getList(parseInt(req.params.index))
        res.result.data = {
            categories
        }
    },
    create: async(req,res) => {
        const category = await db.main.Category.create(req.body.name, req.body.subcategories, {
            colors: (req.body.requiredColors) ? true : false,
            sizes: (req.body.requiredSizes) ? true : false
        })
        res.result.data = category
    },
    addSubcategory: async(req,res) => {
        const result = await db.main.Category.updateOne({ _id: req.params.categoryId }, {
            $addToSet: {
                'subcategories': req.body.subcategory.trim().toLowerCase()
            }
        })
        if(result.n < 1) throw {httpStatus: 404, message: 'Category not found'}
    }
}
module.exports = categoryController