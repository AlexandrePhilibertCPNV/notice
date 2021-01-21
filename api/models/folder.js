const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    name: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
});

const Folder = mongoose.model('Folder', folderSchema);

export default Folder;