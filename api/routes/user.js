const { Router } = require("express");

const UserController = require("../controllers/user");
const session = require("../middlewares/session");

const router = Router();

router.get('/', [session], UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/', UserController.create);

module.exports = router;