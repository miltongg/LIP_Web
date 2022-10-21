const {Router} = require('express');
const router = Router();
const {verifyToken} = require('../middlewares/authJwt')

const {idea, ideas} = require('../controllers/idea.controller')

router.post('/idea', verifyToken, idea);

router.get('/idea', idea);

router.put('/idea', verifyToken, idea)

router.get('/ideas', ideas);

router.delete('/idea', verifyToken, idea);

module.exports = router;