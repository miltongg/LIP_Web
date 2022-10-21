const User = require('../models/User.model');
const Review = require('../models/Review.model')
const jwt = require('jsonwebtoken');
const randomHash = require('../helpers/randomHash');

const usersCtrl = {};

const {
    OK, NOT_FOUND, TOKEN, NO,
    METHOD_POST,
    METHOD_PUT,
    METHOD_GET,
    METHOD_DELETE,
    DEFAULT_PROFILE_IMG
} = require("../helpers/constList");

usersCtrl.user = (req, res) => {

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

// CREATE USER //
usersCtrl.signup = async (req, res) => {

    try {
        const {name, email, password} = req.body;

        if (!name) return res.status(400).json({
            ok: false,
            message: 'El nombre no puede estar vacío'
        })

        if (!password) return res.status(400).json({
            ok: false,
            message: 'Las contraseñas no pueden estar vacías'
        })

        const username = email.split('@')[0]

        const newUser = new User({
            _id: 'user_' + randomHash(),
            name,
            username,
            password: await User.encryptPassword(password),
            email,
            img: DEFAULT_PROFILE_IMG
        });

        const user = await User.findOne({email})

        if (user) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario ya existe'
            })
        }

        if (user && newUser.username === user.username)
            newUser.username = newUser.username + Math.round(Math.random() * 100)

        const savedUser = await newUser.save();

        // const saveUser = await User.findOne({ email: newUser.email })

        const token = jwt.sign({_id: savedUser.id}, process.env.SECRET, {
            expiresIn: '20y'
        });

        await newUser.update({token})

        return res.json({
            ok: true,
            token: token,
            id: savedUser.id,
            role: savedUser.role,
            name: savedUser.name,
            email: savedUser.email,
            message: 'User Saved'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}


usersCtrl.signin = async (req, res) => {

    try {

        let find = {}

        const {email, password} = req.body;

        if (email.includes('@')) {
            find.email = email
        } else {
            find.username = email
        }

        const user = await User.findOne(find)

        if (!user) {
            return res.status(NOT_FOUND).json({
                ok: false,
                message: "El correo o usuario no existe"
            })
        }

        const matchPassword = await User.comparePassword(password, user.password);

        if (!matchPassword) {
            return res.status(401).json({
                ok: false,
                message: "La contraseña es incorrecta"
            })
        }

        const token = jwt.sign({_id: user.id}, process.env.SECRET, {
            expiresIn: '20y'
        });

        await User.updateOne({_id: user.id}, {$push: {token}})

        res.status(OK).json({

            ok: true,
            token: token,
            id: user?.id,
            role: user?.role,
            name: user?.name,
            username: user?.username,
            email: user?.email

        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

usersCtrl.renew = async (req, res) => {

    const token = req.headers[TOKEN]

    const user = await User.findOne({token})

    res.status(200).json({
        ok: true,
        token,
        id: user?.id,
        name: user?.name,
        username: user?.username,
        role: user?.role,
        email: user?.email
    })

}

// signout
usersCtrl.signout = async (req, res) => {

    try {
        const token = req.headers[TOKEN];

        await User.findOneAndUpdate({token}, {$pull: {token}});

        res.status(OK).json({
            message: 'Sesión cerrada satisfactoriamente'
        })
    } catch (error) {
        res.status(500).json(error.message)
    }

}


// get one user by token
async function get(req, res) {
    try {

        const token = req.headers[TOKEN];

        const user = await User.findOne({token}, {password: 0});

        res.status(OK).json({
            ok: true,
            data: user
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// UPDATE USER //
async function put(req, res) {

    try {

        const {name, username, email, password, img} = req.body

        let decryptPass;
        let newPassword;

        const findUser = await User.findOne({_id: req.user.id})

        if (!findUser) {
            return res.status(404).json({
                ok: false,
                message: "Usuario no encontrado"
            })
        }

        if (username) {

            const nick = await User.findOne({username})

            if (nick) {
                return res.status(401).json({
                    message: 'Ya existe una cuenta con ese Nickname'
                })
            }

        }

        if (password) {

            decryptPass = await User.comparePassword(password, findUser.password);

            newPassword = await User.encryptPassword(password);

            if (!decryptPass) {
                return res.status(401).json({message: 'La contraseña actual es incorrecta'})
            }

        }

        if (img) {
            await Review.updateMany({userId: findUser.id}, {userImg: img})
        }

        await User.findOneAndUpdate({_id: req.user.id}, {
            name,
            username,
            email,
            img,
            password: newPassword
        });

        res.json({message: 'Usuario actualizado satisfactoriamente'})

    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
}

// delete a user
async function del(req, res) {
    try {

        const {id} = req.headers

        const userToDelete = await User.findOne({_id: id})

        if (!userToDelete) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado'
            })
        }

        await userToDelete.deleteOne()

        res.status(200).json({
            ok: true,
            message: "Usuario eliminado satisfactoriamente"
        })

    } catch (error) {

        res.status(500).json(error.message)

    }
}

// get user by params

usersCtrl.adminUserEdit = async (req, res) => {
    try {

        const {id} = req.headers;

        const user = await User.findOne({_id: id});

        res.status(OK).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// edit user by admin

// usersCtrl.adminUserEdit = async (req, res) => {
//   try {
//
//     const { id, name, username, email } = req.headers
//
//     const userToEdit = await User.findOne({_id: id})
//
//     if (!userToEdit) {
//       return res.status(NOT_FOUND).json({
//         message: 'User not Found'
//       })
//     }
//
//     await User.findOneAndUpdate({_id: req.params.id}, {name, username, email})
//
//     res.status(OK).json({
//       message: "Usuario editado satisfactoriamente"
//     })
//
//   } catch (error) {
//     res.status(500).json(error.message)
//   }
// }

// GET USER LIST //
usersCtrl.users = async (req, res) => {
    try {

        let {limit, offset} = req.headers

        if (!limit) limit = 10;
        if (!offset) offset = 0

        const users = await User.find()
            .limit(Number(limit))
            .skip(Number(offset))

        res.status(OK).json(users)

    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = usersCtrl