const { Router } = require("express");

const SessionController = require("../controllers/session");

const router = Router();

router.post('/', SessionController.create);

module.exports = router;