const express = require("express");
const router = express.Router();
const controller = require("../controllers/createController");

router.post("/authors", controller.createAuthor);

router.delete("/blogs/:blogId", controller.deleteBlog);

module.exports = router;