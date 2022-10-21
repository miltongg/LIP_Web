const {Router} = require('express');
const router = Router();
const {verifyToken} = require('../middlewares/authJwt')

const {review, reviews, deleteReview} = require('../controllers/review.controller')

router.post('/review', verifyToken, review);

router.delete('/review', verifyToken, deleteReview)

router.get('/reviews', reviews);

module.exports = router;