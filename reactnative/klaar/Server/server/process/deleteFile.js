const path = require('path')
const fs = require('fs')

module.exports = async(fileName) => {
    try {
        if(fileName.match(/(default|wait)/ig)) return
        const fileFullPath = path.resolve('public/' + fileName)
        let done = new Promise((resolve,reject) => {
            fs.unlink(fileFullPath, (e) => {
                if(e) reject(e)
                resolve('done!')
            })
        })
        await done
    } catch(e) {
        return
    }
}