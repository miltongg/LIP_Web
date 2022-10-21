const Idea = require('../models/Idea.model');
const Review = require('../models/Review.model');
const User = require('../models/User.model')
const randomHash = require('../helpers/randomHash');

const ideaCtrl = {};

const {
    OK, NOT_FOUND, TOKEN, NO,
    METHOD_POST,
    METHOD_PUT,
    METHOD_GET,
    METHOD_DELETE,
} = require("../helpers/constList");

ideaCtrl.idea = (req, res) => {

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


// CREATE IDEA //
async function post(req, res) {

    try {

        const {title, category, email, description} = req.body

        if (!title) {
            return res.status(401).json({
                ok: false,
                message: 'El titulo no puede estar vacio'
            })
        } else if (category.length === 0) {
            return res.status(401).json({
                ok: false,
                message: 'Por favor, elige una categoría para tu idea'
            })
        } else if (!description) {
            return res.status(401).json({
                ok: false,
                message: 'La descripcion no puede estar vacia'
            })
        }

        const newIdea = new Idea({
            _id: 'idea_' + randomHash(),
            author: req.user.id,
            title,
            email,
            category,
            description
        })

        await newIdea.save();

        return res.status(200).json({
            ok: true,
            message: 'Idea creada satisfactoriamente'
        })

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: err.message
        })
    }
}


// UPDATE IDEA //
async function put(req, res) {

    try {

        const {id} = req.headers;

        const ideaToEdit = await Idea.findOne({_id: id})

        let {title, category, email, description} = req.body

        if (!title)
            title = ideaToEdit.title

        if (category.length === 0)
            category = ideaToEdit.category

        if (!description)
            description = ideaToEdit.description

        await Idea.updateOne({_id: id}, {title, email, category, description})

        return res.status(200).json({
            ok: true,
            message: 'Idea actualizada satisfactoriamente'
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            ok: false,
            message: err.message
        })
    }
}


// GET ONE IDEA //

async function get(req, res) {

    try {

        const {id} = req.headers;

        const token = req.headers[TOKEN]

        const idea = await Idea.findOne({_id: id});

        if (!idea) return res.status(404).json({
            ok: false,
            message: 'Idea no enontrada'
        })

        const user = await User.findOne({token})

        idea.views = idea.views + 1
        await idea.save()

        const reviews = await Review.find({elementId: id})

        idea.reviewsCount = reviews.length;

        idea.editable = user?.id === idea.author

        return res.status(200).json({
            ok: true,
            data: idea
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            ok: false,
            message: err.message
        })
    }
}


// GET IDEAS LIST //

ideaCtrl.ideas = async (req, res) => {

    let {limit, offset, author} = req.headers

    if (!limit) limit = 10;
    if (!offset) offset = 0

    const filter = {}

    if (author) filter.author = author

    try {

        const ideaListSize = await Idea.find().count()

        let ideaList = await Idea.find(filter)
            .sort({createdAt: -1})
            .limit(Number(limit))
            .skip(Number(offset))

        let reviews

        for (let elements of ideaList) {

            reviews = await Review.find({elementId: elements.id})
            elements.reviewsCount = reviews.length

        }

        return res.status(200).json({
            ok: true,
            data: ideaList,
            ideaListSize
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            message: err.message
        })
    }
}


// DELETE IDEA //

async function del(req, res) {

    try {
        const {id} = req.headers

        const deleteIdea = await Idea.findOne({_id: id})

        if (!deleteIdea)
            return res.status(404).json({
                ok: false,
                message: 'La idea no existe'
            })

        await deleteIdea.deleteOne()

        await Review.deleteMany({elementId: id})

        res.status(200).json({
            ok: true,
            message: 'Idea borrada satisfactoriamente'
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            message: err.message
        })
    }

}


module.exports = ideaCtrl;