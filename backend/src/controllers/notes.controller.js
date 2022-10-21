const notesCtrl = {};
const Note = require('../models/Note');
const {
    METHOD_POST,
    METHOD_PUT,
    METHOD_GET,
    METHOD_DELETE,
} = require("../helpers/constList");

notesCtrl.note = (req, res) => {

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

// create a note
async function post(req, res) {
    try {
        const {title, content, date, author} = req.body;
        const newNote = new Note({
            title,
            content,
            date,
            author
        });

        await newNote.save();
        res.json({message: 'Note Saved'})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// get one note
async function get(req, res) {
    const note = await Note.findById(req.params.id);
    res.json(note);
}

// update a note
async function put(req, res) {
    const {title, content, author} = req.body;
    await Note.findOneAndUpdate({_id: req.params.id}, {
        title, content, author
    });
    res.json({message: 'Note updated'})
}

async function del(req, res) {
    await Note.findOneAndDelete({_id: req.params.id});
    res.json({message: 'Note deleted'})
}

// get all notes
notesCtrl.notes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
}

module.exports = notesCtrl