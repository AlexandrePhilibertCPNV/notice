const TextBlock = require("../models/textBlock");

class TextBlockController {

    static async getAll(req, res) {
        res.json(await TextBlock.find());
    }

    static async getById(req, res) {
        res.json(await TextBlock.findById(req.params.id));
    }

    static async create(req, res) {
        let textBlock = await TextBlock.create(req.body);

        res.json(textBlock);
    }
    
}

module.exports = TextBlockController;