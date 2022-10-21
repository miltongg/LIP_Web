const Idea = require('../models/Idea.model');
const Review = require('../models/Review.model')

const {
    OK, NOT_FOUND, TOKEN, NO,
    METHOD_POST,
    METHOD_PUT,
    METHOD_GET,
    METHOD_DELETE,
} = require("../helpers/constList");

const like = async (req, res) => {

    try {
        const {id} = req.headers;

        const user = req.user

        const review = await Review.findOne({_id: id});

        let like;
        let dislike = false;
        let message = ''
        if (user.likes.includes(id)) {
            message = "Quitaste el me gusta"
            await review.updateOne({likes: review.likes - 1})
            await user.updateOne({$pull: {likes: review.id}})
            like = false

        } else {
            message = "Diste me gusta"
            await review.updateOne({likes: review.likes + 1})
            await user.updateOne({$push: {likes: review.id}})
            if (user.dislikes.includes(id))
                dislike = true
            like = true
            if (user.dislikes.includes(id)) {
                await review.updateOne({dislikes: review.dislikes - 1})
                await user.updateOne({$pull: {dislikes: review.id}})
            }
        }

        res.status(200).json({
            ok: true,
            like,
            dislike,
            message
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

const dislike = async (req, res) => {

    try {
        const {id} = req.headers;

        const user = req.user;

        const review = await Review.findOne({_id: id});
        let like = false;
        let dislike;
        let message = ''
        if (user.dislikes.includes(id)) {
            message = "Quitaste el no me gusta"
            await review.updateOne({dislikes: review.dislikes - 1})
            await user.updateOne({$pull: {dislikes: review.id}})
            dislike = false;
        } else {
            message = "Diste no me gusta"
            await review.updateOne({dislikes: review.dislikes + 1})
            await user.updateOne({$push: {dislikes: review.id}})
            if (user.likes.includes(id))
                like = true
            dislike = true
            if (user.likes.includes(id)) {
                await review.updateOne({likes: review.likes - 1})
                await user.updateOne({$pull: {likes: review.id}})
            }
        }

        res.status(200).json({
            ok: true,
            like,
            dislike,
            message
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}


module.exports = {
    like,
    dislike
}