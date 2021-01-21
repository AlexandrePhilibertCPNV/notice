const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notice', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});