const express = require('express');
const router = express.Router();
 const userModel= require("../models/userModel.js")
const userController= require("../controllers/userController")
const Bookcontroller= require("../controllers/bookController")
const productController = require("../controllers/productcontroller")
const orderController= require("../controllers/ordercontroller")
const Middleware= require("../middleware/middleware")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//router.post("/createUser",Middleware.middleware1, userController.createUser  )
router.post("/createUser",Middleware.isFreeAppUserMiddleware,userController.createUser  )

router.get("/getUsersData", userController.getUsersData)
router.post("/createProduct",productController.createProduct)
//router.post("/createOrder", Middleware.middleware1,orderController.createOrder)
router.post("/createOrder",Middleware.isFreeAppUserMiddleware, orderController.createOrder  )
router.get("/getOrderData", orderController.getOrderData)

//router.post("/createBook", BookController.createBook  )

//router.get("/getBooksData", BookController.getBooksData)

//router.post("/updateBooks", BookController.updateBooks)
//router.post("/deleteBooks", BookController.deleteBooks)

//MOMENT JS
const moment = require('moment');
router.get("/dateManipulations", function (req, res) {
    
    // const today = moment();
    // let x= today.add(10, "days")

    // let validOrNot= moment("29-02-1991", "DD-MM-YYYY").isValid()
    // console.log(validOrNot)
    
    const dateA = moment('01-01-1900', 'DD-MM-YYYY');
    const dateB = moment('01-01-2000', 'DD-MM-YYYY');

    let x= dateB.diff(dateA, "days")
    console.log(x)

    res.send({ msg: "all good"})
})

module.exports = router;