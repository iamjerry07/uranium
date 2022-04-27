const express = require("express");
const router = express.Router();
const controller = require("../controllers/createController");

router.post("/authors", controller.createAuthor);

router.get("/blogs", controller.getBlog);

module.exports = router;