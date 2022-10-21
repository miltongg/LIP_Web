const {Router} = require('express');
const router = Router();

const {note, notes} = require('../controllers/notes.controller');

router.route('/note')
    .post(note)

router.route('/notes')
    .get(notes)

router.route('/note/:id')
    .get(note)
    .put(note)
    .delete(note)

module.exports = router;