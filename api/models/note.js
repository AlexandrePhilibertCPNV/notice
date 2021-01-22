const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    name: {
        type: String
    },
    parts: [{
        contentType: String,
        content: mongoose.Mixed,
        position: {
            type: {
                x: Number,
                y: Number
            }
        },
        meta: {
            fontFamily: String,
            fontSize: String,
            fontBold: String,
            fontItalic: String,
            fontUnderline: String,
            fontColor: String
        }
    }]
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;