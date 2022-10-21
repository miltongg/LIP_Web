const App = require('../models/App.model')
const randomHash = require('../helpers/randomHash');
const {METHOD_POST, METHOD_GET, METHOD_PUT, METHOD_DELETE, TOKEN} = require("../helpers/constList");
const Idea = require("../models/Idea.model");
const User = require("../models/User.model");
const Review = require("../models/Review.model");
const formatBytes = require("../helpers/convertSizes")

const appCtrl = {}

appCtrl.app = (req, res) => {

    switch (req.method) {
        case METHOD_POST:
            return post(req, res);
        case METHOD_GET:
            return get(req, res);
        case METHOD_PUT:
            return put(req, res);
        case METHOD_DELETE:
            return del(req, res);
    }
};


// CREATE APP //
async function post(req, res) {

    try {
        const {
            title, version, type, SORequired, author,
            description, category, appPhoto, appUrl, size
        } = req.body;


        console.log(size, 'size')

        console.log(req.body)

        if (!title || !version || !type || !SORequired || !author || !description || !category.length) {
            console.log('campos vacios')
            return res.status(400).json({
                ok: false,
                message: 'No pueden haber campos vacíos'
            })
        }

        const newApp = new App({
            _id: 'app_' + randomHash(),
            title, version, type, SORequired, author,
            description, category, img: appPhoto, appUrl, size
        })

        // newApp.appPhoto = newApp.appPhoto.split('.')[0]

        await newApp.save();

        return res.status(200).json({
            ok: true,
            id: newApp.id,
            message: 'Aplicación añadida satisfactoriamente'
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            ok: false,
            message: err.message
        })
    }

}


// GET ONE APP //
async function get(req, res) {

    try {

        const {id} = req.headers;

        const token = req.headers[TOKEN]

        const app = await App.findOne({_id: id});

        if (!app) return res.status(404).json({
            ok: false,
            message: 'Aplicación no enontrada'
        })

        const user = await User.findOne({token})

        app.views = app.views + 1
        await app.save()

        const reviews = await Review.find({elementId: id})

        app.reviewsCount = reviews.length;

        app.editable = user?.id === app.author

        app.size = formatBytes(app.size)

        return res.status(200).json({
            ok: true,
            data: app
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            ok: false,
            message: err.message
        })
    }
}


// UPDATE APP //
async function put(req, res) {

    try {

        const {id} = req.headers;

        const appToEdit = await App.findOne({_id: id})

        if (!appToEdit) {
            return res.status(404).json({
                ok: false,
                message: 'Aplicación no encontrada'
            })
        }

        let {title, version, type, SORequired, author, description, category, appPhoto, appUrl, download} = req.body

        if (!download || isNaN(download)) {
            download = 0
        }

        // if (!title)
        //     title = appToEdit.title
        //
        // if (category.length === 0)
        //     category = appToEdit.category
        //
        // if (!description)
        //     description = appToEdit.description

        await App.updateOne({_id: id}, {
            title, version, type, SORequired, author, description, category, appUrl,
            img: appPhoto,
            downloadsCount: appToEdit.downloadsCount + Number(download)
        })

        return res.status(200).json({
            ok: true,
            message: 'Aplicación actualizada satisfactoriamente'
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            ok: false,
            message: err.message
        })
    }
}


// DELETE APP //
async function del(req, res) {

    try {
        const {id} = req.headers

        const deleteApp = await App.findOne({_id: id})

        if (!deleteApp)
            return res.status(404).json({
                ok: false,
                message: 'La aplicación no existe'
            })

        await deleteApp.deleteOne()

        await Review.deleteMany({elementId: id})

        res.status(200).json({
            ok: true,
            message: 'Aplicación borrada satisfactoriamente'
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            message: err.message
        })
    }

}


// GET APP LIST //
appCtrl.apps = async (req, res) => {

    let {limit, skip} = req.headers

    if (!limit) limit = 10;
    if (!skip) skip = 0

    try {

        const appList = await App.find({})
            .sort({createdAt: -1})
            .limit(Number(limit))
            .skip(Number(skip))

        let reviews

        for (let elements of appList) {

            reviews = await Review.find({elementId: elements.id})
            elements.reviewsCount = reviews.length

        }

        return res.status(200).json({
            ok: true,
            data: appList
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            message: err.message
        })
    }
}


module.exports = appCtrl;