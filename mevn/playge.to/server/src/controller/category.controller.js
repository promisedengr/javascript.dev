const Category = require('../model/category.model')

async function sample (req, res, next){
    try {
        console.log('connected to file')
        res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/category.controller/sample' + error)
    }
}
async function getCategoryList (req, res, next){
    try {
        Category.getAll( (err, data) => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send()
            }
        });
    } catch (error) {
        console.log('api/controller/category.controller/getCategoryList' + error)
    }
}
module.exports = {
    getCategoryList
}