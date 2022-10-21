const {Schema, model} = require('mongoose');

const reviewSchema = new Schema({

    _id: String,

    rating: {
        type: Number,
        default: 0
    },

    elementId: String,

    userId: String,

    user: String,

    userImg: String,

    comment: {
        type: String,
        default: ''
    },

    likes: {
        type: Number,
        default: 0
    },

    dislikes: {
        type: Number,
        default: 0
    },

    date: {
        type: Date,
        default: Date.now()
    }

}, {
    timestamps: true,
    versionKey: false
});

reviewSchema.methods.toJSON = function () {
    const {_id, ...review} = this.toObject();
    review.id = _id;
    return review
};

module.exports = model('Review', reviewSchema);