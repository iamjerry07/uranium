const express = require("express");
const router = express.Router();
const controller = require("../controllers/createController");

router.post("/authors", controller.createAuthor);
router.post("/blogs", controller.createBlog);
router.get("/blogs", controller.getBlog);
router.delete("/blogs/:_id", controller.deleteBlog);
router.put("/blogs/:blogId", controller.updateData);

module.exports = router;