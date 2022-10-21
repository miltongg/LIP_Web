const Review = require('../models/Review.model');
const Idea = require('../models/Idea.model');
const App = require('../models/App.model');


const randomHash = require('../helpers/randomHash');

reviewCtrl = {};


///// CREATE REVIEW /////

reviewCtrl.review = async (req, res) => {

    try {

        const {id, elementid, rating, comment} = req.headers

        const review = await Review.findOne({elementId: elementid, userId: req.user.id})

        if (!review) {

            const newReview = new Review({
                _id: 'review_' + randomHash(),
                userId: req.user.id,
                user: req.user.name,
                elementId: elementid,
                rating,
                comment,
                userImg: req.user.img
            })

            if (!rating || rating === '0')
                return res.status(400).json({
                    ok: false,
                    message: '¿Cuantas estrellas le das a la idea?'
                })

            if (!comment)
                return res.status(400).json({
                    ok: false,
                    message: 'Por favor, comenta algo...'
                })

            await newReview.save();

            const updateElementRating = await Review.find({elementId: elementid})

            if (updateElementRating.length === 0) {
                return res.status(404).json({
                    ok: false,
                    message: 'Elemento no encontrado'
                })
            }

            const c = updateElementRating.length;
            let s = 0;
            for (let i = 0; i < updateElementRating.length; i++) {
                s += updateElementRating[i].rating
            }
            const media = s / c;
            const avg = media.toFixed(1)

            if (elementid.includes('idea_')) {
                await Idea.updateOne({_id: elementid}, {rating: avg}, {new: true})
            } else {
                await App.updateOne({_id: elementid}, {rating: avg}, {new: true})
            }

            res.status(200).json({
                ok: true,
                message: "Comentario creado correctamente"
            })

        } else {


            if (!rating || rating === '0')
                return res.status(400).json({
                    ok: false,
                    message: '¿Cuantas estrellas le das a la idea?'
                })

            if (!comment)
                return res.status(400).json({
                    ok: false,
                    message: 'Por favor, comenta algo...'
                })

            await review.updateOne({rating, comment})

            const updateElementRating = await Review.find({elementId: elementid})

            const c = updateElementRating.length;
            let s = 0;
            for (let i = 0; i < updateElementRating.length; i++) {
                s += updateElementRating[i].rating
            }

            const media = s / c;
            const avg = media.toFixed(1)


            if (elementid.includes('idea_')) {
                await Idea.updateOne({_id: elementid}, {rating: avg}, {new: true})
            } else {
                await App.updateOne({_id: elementid}, {rating: avg}, {new: true})

            }

            res.status(200).json({
                ok: true,
                message: "Has actualizado tu comentario"
            })

        }

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: error.message
        })

    }

}

// DELETE REVIEW //

reviewCtrl.deleteReview = async (req, res) => {

    try {
        const {id, elementid} = req.headers;

        const reviewToDelete = await Review.findOne({_id: id});

        if (!reviewToDelete) {
            return res.status(404).json({
                ok: false,
                message: 'Comentario no encontrado'
            });
        }

        let DB;

        if (elementid.includes('idea_')) {
            DB = Idea
        } else {
            DB = App
        }

        await reviewToDelete.deleteOne();

        const updateElementRating = await Review.find({elementId: elementid})

        if (updateElementRating.length === 0) {

            await DB.updateOne({_id: elementid}, {rating: 0}, {new: true})

        } else {

            const c = updateElementRating.length;
            let s = 0;
            for (let i = 0; i < updateElementRating.length; i++) {
                s += updateElementRating[i].rating
            }
            const media = s / c;
            const avg = media.toFixed(1)

            await DB.updateOne({_id: elementid}, {rating: avg}, {new: true})

        }

        res.status(200).json({
            ok: true,
            message: 'Comentario borrado satisfactoriamente'
        })

    } catch (error) {

        console.error(error);
        console.log(req.headers);
        res.status(500).json({
            ok: false,
            message: error.message
        })

    }

}

reviewCtrl.reviews = async (req, res) => {

    try {

        const {elementid} = req.headers

        let reviews = await Review.find({elementId: elementid})
            .sort({createdAt: -1})

        res.status(200).json({
            ok: true,
            data: reviews
        })

    } catch (error) {

        console.error(error);
        console.log(req.headers);
        res.status(500).json({
            ok: false,
            message: error.message
        })

    }

}

//obtener promedio de review
function promedio(review) {
    let c = review.length;
    let s = 0;
    for (let i = 0; i < c; i++) {
        s += review[i].rating
    }
    return s / c
}

//obtener review de business
async function reviewFrom(reference) {
    let references = await Review.find({referenceId: reference});
    return references
}

// obtener proedio de review
async function promedioReview(reference) {
    let reviews = await reviewFrom(reference);
    let p = promedio(reviews);

    return p
}

module.exports = reviewCtrl