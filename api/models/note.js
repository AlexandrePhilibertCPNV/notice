const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    name: {
        type: String
    }
});

const Note = mongoose.model('User', noteSchema);

export default Note;