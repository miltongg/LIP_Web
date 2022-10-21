const path = require("path");
const fs = require('fs')
const {APP_IMG_UPLOAD_FOLDER} = require("./constList");
const randomHash = require('../helpers/randomHash')


const uploadFile = (files, folder = '', validExt = ['png', 'jpg', 'jpeg', 'bmp']) => {

    return new Promise((resolve, reject) => {

        const {file} = files;
        const splitName = file.name.split('.');
        const ext = splitName[splitName.length - 1]
        let prefix

        if (!validExt.includes(ext)) {
            return reject(`La extensión "${ext}" no se encuentra en las permitidas: ${validExt}`)
        }

        if (ext.includes('apk')) {
            prefix = 'app_'
        } else {
            prefix = 'img_'
        }

        let uploadPath = path.join(__dirname, '../' + APP_IMG_UPLOAD_FOLDER, folder)

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath)
        }

        const tempName = prefix + randomHash() + '.' + ext;
        uploadPath = uploadPath + '/' + tempName

        file.mv(uploadPath, (error) => {
            if (error) {
                console.log(error)
                reject(error)
            }

            resolve(tempName)

        })
    })
}


module.exports = {
    uploadFile
}