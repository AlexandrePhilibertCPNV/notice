const User = require("../models/user");

class UserController {

    static async getAll(req, res) {
        res.json(await User.find());
    }

    static async getById(req, res) {
        res.json(await User.findById(req.params.id));
    }

    static async create(req, res) {
        let user = await User.create(req.body);

        res.json(user);
    }
    
}

module.exports = UserController;