const {Schema, model} = require('mongoose');

const appSchema = new Schema({

    _id: String,

    title: String,

    version: String,

    type: String,

    SORequired: String,

    author: String,

    description: String,

    category: [],

    size: String,

    downloadsCount: {
        type: Number,
        default: 0
    },

    rating: {
        type: Number,
        default: 0
    },

    views: {
        type: Number,
        default: 0
    },

    img: String,

    appScreenshots: [],

    appUrl: String,

    // CALCULATED FIELDS

    reviewsCount: Number,

    editable: Boolean
}, {
    timestamps: true,
    versionKey: false
});

appSchema.methods.toJSON = function () {
    const {_id, ...app} = this.toObject();
    app.id = _id;
    return app
}

module.exports = model('App', appSchema);