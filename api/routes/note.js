const { Router } = require("express");

const NoteController = require("../controllers/note");
const session = require("../middlewares/session");

const router = Router();

router.get('/', NoteController.getAll);
router.get('/:id', NoteController.getById);
router.post('/', NoteController.create);
router.delete('/:id', NoteController.delete);
router.patch('/:id/', NoteController.update);
router.post('/:id/pushPart', NoteController.pushPart);
router.post('/:id/pullPart/:partId', NoteController.pullPart);


module.exports = router;