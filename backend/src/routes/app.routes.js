const {Router} = require('express');
const router = Router();
const {verifyToken} = require('../middlewares/authJwt')

const {app, apps} = require('../controllers/app.controller')

router.post('/app', verifyToken, app);

router.get('/app', app);

router.put('/app', app);

router.get('/apps', apps);

router.delete('/app', verifyToken, app);

module.exports = router;