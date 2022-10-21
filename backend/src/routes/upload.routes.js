const {Router} = require('express');
const router = Router();
const {verifyToken} = require('../middlewares/authJwt')

const {uploadFile, updateUploadFile, getFile} = require('../controllers/upload.controller')

router.post('/upload', uploadFile);

router.get('/:folder/:id', getFile)

module.exports = router;