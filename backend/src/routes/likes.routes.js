const {Router} = require('express');
const router = Router();
const {verifyToken} = require('../middlewares/authJwt')

const {like, dislike} = require('../controllers/like.controller')

router.post('/like', verifyToken, like);
router.post('/dislike', verifyToken, dislike);


module.exports = router;