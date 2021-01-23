const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../models/user');

class Session {
    static async create(req, res, next) {
        let value = crypto.randomBytes(24).toString('hex');

        const user = await User.findOne({email: req.body.email});

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            next({code: 403, message: 'Invalid login supplied'});
            return;
        }

        await User.updateOne({ _id: user._id }, { $push: { tokens: value } });

        res.json({
            value
        });
    }
}

module.exports = Session;