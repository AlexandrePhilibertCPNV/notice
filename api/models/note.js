const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    name: {
        type: String
    },
    childs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TextBlock'
    }]
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;