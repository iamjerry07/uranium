const express = require('express');
const router = express.Router();

const developerController= require("../controllers/developerController")
const batchController= require("../controllers/batchController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/batches", batchController.createBatch)

router.post("/developers", developerController.createDeveloper)


module.exports = router;