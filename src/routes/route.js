const express = require("express");
const router = express.Router();
const { createBlog, getBlog, deleteBlog, deleteBlogByQuery, updateData } = require("../controllers/blogController");
const { createAuthor, authorLogin } = require("../controllers/authorController")
const { authentication, authorisation } = require("../middlewares/middleware")

router.post("/authors", createAuthor);
router.post("/blogs", authentication, createBlog);
router.get("/blogs", authentication, getBlog);
router.put("/blogs/:blogId", authentication, authorisation, updateData);
router.delete("/blogs/:blogId", authentication, authorisation, deleteBlog);
router.delete("/blogs", authentication, deleteBlogByQuery);
router.post("/login", authorLogin);

module.exports = router;