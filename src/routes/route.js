const express = require("express");
const router = express.Router();
const {createAuthor,createBlog,getBlog,deleteBlog,deleteBlogBy,updateData,authorLogin,middleware,middleware2} = require("../controllers/controller");

router.post("/authors", createAuthor);
router.post("/blogs",middleware, createBlog);
router.get("/blogs",middleware, getBlog);
router.delete("/blogs/:blogId", middleware,middleware2,deleteBlog);
router.delete("/blogs", middleware,deleteBlogBy);
router.put("/blogs/:blogId",middleware,middleware2, updateData);
router.post("/login", authorLogin);

module.exports = router;