const { Router } = require("express");

const TextBlockController = require("../controllers/textBlock");

const router = Router();

router.get('/', TextBlockController.getAll);
router.get('/:id', TextBlockController.getById);
router.post('/', TextBlockController.create);

module.exports = router;