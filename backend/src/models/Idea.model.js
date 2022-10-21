const {Schema, model} = require('mongoose');

const ideaSchema = new Schema({

    _id: String,

    title: String,

    author: String,

    email: {
        type: String,
        default: ''
    },

    category: {
        type: Array,
        of: String
    },

    description: String,

    createdBy: String,

    rating: {
        type: Number,
        default: 0
    },

    views: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        default: 'pending'
    },

    // CALCULATED FIELDS

    reviewsCount: Number,

    editable: Boolean,

}, {
    timestamps: true,
    versionKey: false
});

ideaSchema.methods.toJSON = function () {
    const {_id, ...idea} = this.toObject();
    idea.id = _id;
    return idea
};

module.exports = model('Idea', ideaSchema);