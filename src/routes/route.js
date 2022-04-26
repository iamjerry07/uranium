const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.post("/authors", controller.createAuthor);

module.exports = router;