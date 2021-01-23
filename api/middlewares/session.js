const User = require("../models/user");

async function session(req, res, next) {
    const user = await User.findOne({ tokens: req.body.token });

    if (user) {
        req.user = user;
        next();        
    } else {
        next({code: 403, message: 'Invalid token'});
    }
}

module.exports = session;