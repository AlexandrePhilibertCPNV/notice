const express = require('express');
const app = express();
const port = 8000;

require('./database');

app.disable('x-powered-by');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', require('./routes/user'));
app.use('/sessions', require('./routes/session'));
app.use('/notes', require('./routes/note'));

app.use((err, req, res, next) => {
    if (err) {
        console.error(err.stack);

        res.status(500);
        res.json({
            message: 'Internal server error',
        });
    }
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});