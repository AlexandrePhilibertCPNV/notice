const Note = require("../models/note");

class NoteController {

    static async getAll(req, res) {
        res.json(await Note.find());
    }

    static async getById(req, res) {
        res.json(await Note.findById(req.params.id));
    }

    static async create(req, res) {
        let note = await Note.create(req.body);

        res.json(note);
    }
    
}

module.exports = NoteController;