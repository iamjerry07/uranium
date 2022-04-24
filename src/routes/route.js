const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const myController = require('../controllers/myController')
const auth=require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",auth.middleware, userController.getUserData)

router.put("/users/:userId",auth.middleware, userController.updateUser)

router.delete("/users/:userId",auth.middleware,userController.deleteUser)

// my controller

router.post('/createAuthor', myController.createAuthor)

router.post('/createPublication', myController.createPublication)

router.post('/createBook', myController.createBook)

router.get('/allBookData', myController.allBookData)


module.exports = router;