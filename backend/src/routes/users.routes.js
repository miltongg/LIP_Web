const {Router} = require('express');
const router = Router();

const {signup, signin, renew, signout, adminUserEdit, user, users} = require('../controllers/user.controller')
const {verifyToken} = require("../middlewares/authJwt");

router.route('/signup')
    .post(signup)

router.route('/signin')
    .post(signin)

router.route('/renew')
    .get(renew)

router.post('/signout', verifyToken, signout);

router.put('/user', verifyToken, user)


router.route('/uedit/:id')
    .get(adminUserEdit)

router.route('/users')
    .get(users)

router.route('/user')
    .get(user)
    .put(user)
    .delete(user)

// router.route('/:id')
//   .get()
//   .put()
//   .delete()

module.exports = router;