const { query } = require('express');
const express = require('express');
const { countBy } = require('lodash');
const logger = require('./logger')

const router = express.Router();

router.get('/test-me', function (req, res) {
   candidates = ["aman", "chaman", "pawan", "sanam","naman","suman","bhuvan","oven","lagan","bhagwan"]
   console.log(candidates)
    res.send('My first ever api!')
});

    router.get("/test-me1",function (req, res) 
    {
    arr= ["aman", "chaman", "pawan", "sanam","naman","suman","bhuvan","oven","lagan","bhagwan"]
    console.log("my element is" ,arr[req.query.count])
    res.send('My first ever api!')
});




module.exports = router;
// adding this comment for no reason