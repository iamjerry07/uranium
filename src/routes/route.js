const express = require("express");
const router = express.Router();
const controller = require("../controllers/createController");

router.post("/authors", controller.createAuthor);
router.post("/blogs", controller.createBlog);
router.get("/blogs", controller.getBlog);
router.delete("/blogs/:blogId", controller.deleteBlog);
router.delete("/blogs", controller.deleteBlogBy);
router.put("/blogs/:blogId", controller.updateData);

module.exports = router;