const crypto = require('crypto');
const User = require('../models/user');

class Session {
    static async create(req, res) {
        let value = crypto.randomBytes(24).toString('hex');

        await User.updateOne({ _id: req.body.id }, { $push: { tokens: { value } } });

        res.json({
            value
        });
    }
}

module.exports = Session;