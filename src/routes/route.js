const express = require('express');
const logger = require('../logger/logger.js')
const util = require('../util/helper')
const validator = require('../validator/formatter.js')
const lodash = require("lodash");

const router = express.Router();



router.get('/test-me', function (req, res) {
    logger.welcome()
    res.send("hello ")
});

router.get('/test-me1', function (req, res) {
    util.printDate()
    util.printMonth()
    util.getBatchInfo()
    res.send("hello 2 ")
});

router.get('/test-me2', function (req, res) {
    validator.trim()
    res.send("heLLo i am RoHAn ")
});

// let month= ["jan" , "feb" , "march" , "april" , "may" , "june" , "july" , "aug" , "sep" , "oct" , "nov" , "dec"]
// console.log(lodash.chunk(month, 4))

// let oddNum=[1,3,5,7,9,11,13,15,17,19]
// let newArray = lodash.tail(oddNum);
  
// console.log(newArray);

// a= [1,3,5,7,9]
// b= [2,4,6,8,10]
// c= [1,2,3,4,5]
// d= [6,7,8,9,10]
// e= [1,2,8,9,10]
// console.log(lodash.union(a,b,c,d,e));


// movies= [
// ["horror" ,"The Shining"],
// ["drama" , "Titanic"],
// ["thriller" , "Shutter Island"],
// ["fantasy" , "Pans Labyrinth"]]

// let obj = lodash.fromPairs(movies);
  
// console.log(obj)

module.exports = router;
// adding this comment for no reason