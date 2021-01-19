const { Router } = require("express");

const UserController = require("../controllers/user");

const router = Router();

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/', UserController.create);

module.exports = router;