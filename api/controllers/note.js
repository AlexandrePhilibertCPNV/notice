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

    static async pushPart(req, res) {
        let note = await Note.findOne({_id: req.params.id});
        let part = await note.parts.push(req.body);
        await note.save();

        res.json(part);
    }

    static async pullPart(req, res) {
        let note = await Note.findOne({_id: req.params.id});
        let r = await note.parts.pull({_id: req.params.partId});
        await note.save();

        res.json(r);
    }
    
}

module.exports = NoteController;