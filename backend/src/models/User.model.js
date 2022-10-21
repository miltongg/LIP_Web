const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema({

    _id: String,

    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        trim: true,
        // unique: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: 'usuario'
    },

    token: {
        type: Array,
        of: String
    },

    img: {
        type: String,
        default: ''
    },

    likes: {
        type: Array,
        default: []
    },

    dislikes: {
        type: Array,
        default: []
    }

}, {
    timestamps: true,
    versionKey: false

});

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
};

userSchema.statics.comparePassword = async (oldPassword, receivedPassword) => {
    return await bcrypt.compare(oldPassword, receivedPassword)
};

userSchema.methods.toJSON = function () {
    const {_id, ...user} = this.toObject();
    user.id = _id;
    return user
};

module.exports = model('User', userSchema);