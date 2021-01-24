const express = require('express');
const app = express();
const port = 8000;

require('./database');

app.disable('x-powered-by');

app.use(function(req, res, next) {
    // Allow CORS requests, we do not want to keep this in production but this
    // will not get deployed anyways
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");

    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', require('./routes/user'));
app.use('/sessions', require('./routes/session'));
app.use('/notes', require('./routes/note'));

app.use((err, req, res, next) => {
    // Basic error handling, we could have multiple error types we could handle here
    if (err) {
        if (err.stack) {
            console.error(err.stack);
        }

        res.status(err.code || 500);
        res.json({
            message: err.message || 'Internal server error',
        });
    }
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});