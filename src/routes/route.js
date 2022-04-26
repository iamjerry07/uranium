const express = require("express");
const router = express.Router();
const controller = require("../controllers/createController");

router.post("/authors", controller.createAuthor);

<<<<<<< HEAD
router.post("/blogs", controller.createBlog);
=======
router.delete("/blogs/:blogId", controller.deleteBlog);
>>>>>>> cfd6babb35cf2bf81cb3fdd9be61022ae755642d

module.exports = router;