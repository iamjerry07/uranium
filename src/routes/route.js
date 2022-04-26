const express = require("express");
const router = express.Router();
const controller = require("../controllers/createController");

router.post("/authors", controller.createAuthor);

module.exports = router;