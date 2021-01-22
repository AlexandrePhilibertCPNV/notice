const { Router } = require("express");

const NoteController = require("../controllers/note");

const router = Router();

router.get('/', NoteController.getAll);
router.get('/:id', NoteController.getById);
router.post('/', NoteController.create);

module.exports = router;