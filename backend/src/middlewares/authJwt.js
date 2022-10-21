const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const {TOKEN} = require("../helpers/constList");
const resultCodes = require("../helpers/resultCodes");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers[TOKEN];
        if (!token) {
            console.error('No token provided');
            return res.status(401).json({
                message: 'Necesitas loguearte'
            })
        }
        const tokenFound = await User.findOne({token});
        if (!tokenFound) return res.status(401).json({
            message: 'Necesitas loguearte'
        });
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = await User.findOne({_id: decoded._id})

        next()
    } catch (error) {
        console.error(error);
        console.log(req.headers);
        return res.status(401).json({
            text: 'Unauthorized'
        })
    }
};

const verifyIfToken = async (req, res, next) => {
    try {
        let token = req.headers[TOKEN];
        let decoded = null;
        try {
            if (token) {
                decoded = jwt.verify(token, config.SECRET);
                req.userId = decoded._id
            } else if (!token) {
                token = null
            }
        } catch (e) {
            e instanceof JsonWebTokenError;
            console.log('OK' + e.message)
        }
        next()
    } catch (e) {
        console.error(e);
        console.log(req.headers);
        res.status(500).json({
            text: e.message
        })
    }
};

const isBusiness = async (req, res, next) => {

    try {

        const user = await User.findById(req.userId);
        if (user.role === 'businessman') {
            next();
            return;
        }
        // const roles = await Role.find({name: {$in: user.roles}});

        // for (let i = 0; i < roles.length; i++) {
        //     if (roles[i].name === "businessman") {
        //         next();
        //         return
        //     }
        // }
        console.error('Require Business role');
        return res.status(resultCodes.RES_UNAUTHORIZED).json({
            text: 'Unauthorized'
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            text: err.message
        });
    }
};

const isModerator = async (req, res, next) => {

    try {
        const user = await User.findById(req.userId);
        if (user.role === 'moderator' || user.role === 'admin') {
            next();
            return
        }

        // const roles = await Role.find({name: {$in: user.roles}});
        //
        // for (let i = 0; i < roles.length; i++) {
        //     if (roles[i].name === "moderator") {
        //         next();
        //         return
        //     }
        // }
        console.error('Require Moderator role');
        return res.status(resultCodes.RES_UNAUTHORIZED).json({
            text: 'Unauthorized'
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            text: err.message
        });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (user.role === 'admin') {
            next();
            return
        }
        // const roles = await Role.find({name: {$in: user.roles}});
        //
        // for (let i = 0; i < roles.length; i++) {
        //     if (roles[i].name === "admin") {
        //         next();
        //         return
        //     }
        // }
        console.error('Require Admin role');
        return res.status(resultCodes.RES_UNAUTHORIZED).json({
            text: 'Unauthorized'
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            text: err.message
        });
    }

};

module.exports = {verifyToken, verifyIfToken, isModerator, isAdmin, isBusiness};