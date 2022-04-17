const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const a_authorController= require("../controllers/a_authorController1")
const a_bookController= require("../controllers/a_bookController1")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", a_authorController.createAuthor  )

router.post("/createBook", a_bookController.createBook)

router.post("/createWhenAuthorId", a_authorController.createAuthor)

router.post("/createWhenBookId", a_bookController.createBook)

router.post("/findAndUpdate", a_bookController.findAndUpdate)

router.get("/authorsName", a_bookController.authorsName)

module.exports = router;