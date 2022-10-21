const {APP_IMG_UPLOAD_FOLDER} = require('../helpers/constList')
const {uploadFile} = require("../helpers/uploadFile");
const path = require("path");
const App = require('../models/App.model')
const User = require('../models/User.model')
const fs = require('fs')

const uploadsCtrl = {}


// UPLOAD FILE //
uploadsCtrl.uploadFile = async (req, res) => {

    const isUpdating = req.headers.updating

    if (!isUpdating && (!req.files || Object.keys(req.files).length === 0 || !req.files.file)) {
        return res.status(400).json({
            ok: false,
            message: 'No hay archivos seleccionados para subir'
        })
    }

    try {

        const name = await uploadFile(req.files, req.headers.folder, req.headers.validext)

        res.status(200).json({
            ok: true,
            name
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({
            ok: false,
            message: error
        })
    }

}


// GET A FILE //
uploadsCtrl.getFile = async (req, res) => {

    try {

        const {id, folder} = req.params;

        console.log(id, folder, 'aaaaaaaaaaa')

        if (!id) {
            return res.status(400).json({
                ok: false,
                message: 'id vacío'
            })
        }

        if (!folder) {
            return res.status(400).json({
                ok: false,
                message: 'folder vacío'
            })
        }

        const pathFile = path.join(__dirname, '../uploads', folder, id)

        console.log(pathFile)

        if (fs.existsSync(pathFile)) {
            return res.sendFile(pathFile)
        }

        res.status(400).json({
            ok: false,
            message: 'No existe la dirección del archivo'
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }

}

module.exports = uploadsCtrl