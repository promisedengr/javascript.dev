const jimp = require('jimp')
const path = require('path')
const controllerHandle = require('../helpers/controllerHandle')

module.exports = async(base64Data, mimeType, folder, fileName) => {
    try {
        let extension = '.jpg'
        if(mimeType === 'image/png') extension = '.png'
        const origFullName = 'public/images/' + folder + (folder.trim().slice(-1) === '/' ? '' : '/') + fileName + '_orig' + extension
        const origFullPath = path.resolve(origFullName)
        const smallFullName = 'public/images/' + folder + (folder.trim().slice(-1) === '/' ? '' : '/') + fileName + '_small' + extension
        const smallFullPath = path.resolve(smallFullName)
        const fileSizeKilobytes = parseInt((base64Data.replace(/=/g, '').length * 0.75) / 1024)
        if(fileSizeKilobytes > 2048) throw {httpStatus: 400, message: 'Bad request', description: 'Image validation failed: file too big'}

        const img = await jimp.read(Buffer.from(base64Data, 'base64'))
        .then(img => {
            if ( img.bitmap.width <= 3840            //maxWidth
                && img.bitmap.width >= 320            //minWidth
                && img.bitmap.height <= 2160         //maxHeight
                && img.bitmap.height >= 240           //minHeight
                && img._originalMime === mimeType)
                {
                    return img
                } else {
                    throw {httpStatus: 400, message: 'Bad request', description: 'Image validation failed: bad size or mime type'}
                }            
        })
        await img.writeAsync(origFullPath)
        await img.resize(640, 480).writeAsync(smallFullPath)
        return 'images/' + folder + (folder.trim().slice(-1) === '/' ? '' : '/') + fileName + extension
    } catch(e) {
        throw e    
    }
}