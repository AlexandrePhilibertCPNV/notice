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

    static async delete(req, res) {
        res.json(await Note.deleteOne({_id: req.params.id}));
    }

    static async update(req, res) {
        res.json(await Note.updateOne({_id: req.params.id}, req.body));
    }

    static async pushPart(req, res) {
        let note = await Note.findOne({_id: req.params.id});

        // If the part is already in array, delete it to replace it with the new data
        if(req.body._id){
            await note.parts.pull({_id: req.body._id});
        }
        
        let part = await note.parts.push(req.body);
        
        await note.save();

        // Find the new part as an object
        let pObj = await Note.findOne({_id: req.params.id}).slice('parts', part - 1, 1);
        res.json(pObj.parts);
    }

    static async pullPart(req, res) {
        let note = await Note.findOne({_id: req.params.id});
        let r = await note.parts.pull({_id: req.params.partId});
        let s = await note.save();
        
        res.json(r);
    }
    
}

module.exports = NoteController;