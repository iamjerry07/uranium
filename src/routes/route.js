const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/fxnUpCowinController")
const cowincontroller=require("../controllers/Cowincontrollers")
const weathermapController=require("../controllers/weathermapController")
const memeCOntroller=require("../controllers/memeController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date
 //1.
 router.get("/getDistrict",cowincontroller.getDistrict);
 router.get("/getWeatherAll",weathermapController.getWeatherAll);
 router.get("/getWeatherTemp",weathermapController.getWeatherTemp);
 router.get("/arrangeByTemp",weathermapController.arrangeByTemp);
 router.get("/getAllMemes",memeCOntroller.getAllMemes);
 router.post("/createMeme",memeCOntroller.createMeme);
 
module.exports = router;