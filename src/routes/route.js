const express = require("express");
const router = express.Router();
const {createAuthor,createBlog,getBlog,deleteBlog,deleteBlogBy,updateData} = require("../controllers/controller");
//const {createAuthor,createBlog,getBlog,deleteBlog,deleteBlogBy,updateData} = require("../controllers/demoController");

router.post("/authors", createAuthor);
router.post("/blogs", createBlog);
router.get("/blogs", getBlog);
router.delete("/blogs/:blogId", deleteBlog);
router.delete("/blogs", deleteBlogBy);
router.put("/blogs/:blogId", updateData);

module.exports = router;