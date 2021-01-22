const mongoose = require('mongoose');

const textBlockSchema = new mongoose.Schema({
    textContent: {
        type: String
    },
    position: {
        type: [{
            x: { type: Number },
            y: { type: Number }
        }]
    },
    style: {
        type: [{
            color: { type: String },
            fontName: { type: String },
            fontSize: { type: String },
            isBold: { type: Boolean },
            isItalics: { type: Boolean },
            usUnderlined: { type: Boolean }
        }]
    }
    
});

const TextBlock = mongoose.model('TextBlock', textBlockSchema);

module.exports = TextBlock;