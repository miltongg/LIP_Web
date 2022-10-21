require('dotenv').config();
const app = require('./app');
require('./database');
const User = require('./models/User.model');
const randomHash = require('./helpers/randomHash');
const {DEFAULT_PROFILE_IMG} = require("./helpers/constList");

async function checkAdminUser() {

    const admin = await User.findOne({role: 'admin'})

    if (!admin) {

        const newAdmin = new User({

            _id: 'user_' + randomHash(),
            name: 'admin',
            username: 'admin',
            password: await User.encryptPassword('admin'),
            email: 'admin@email.com',
            role: 'admin',
            img: DEFAULT_PROFILE_IMG

        })

        await newAdmin.save();


    }

}

async function main() {
    await app.listen(app.get('port'));
    console.log('server on port', app.get('port'));
}

main();

checkAdminUser();