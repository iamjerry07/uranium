const express = require("express");
const router = express.Router();
const {createAuthor,createBlog,getBlog,deleteBlog,deleteBlogBy,updateData} = require("../controllers/controller");

router.post("/authors", createAuthor);
router.post("/blogs", createBlog);
router.get("/blogs", getBlog);
router.put("/blogs/:blogId", updateData);
router.delete("/blogs/:blogId", deleteBlog);
router.delete("/blogs", deleteBlogBy);

module.exports = router;