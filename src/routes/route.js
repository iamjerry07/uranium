const express = require('express');
const logger = require('./logger')

const router = express.Router();



const arr=["manish","sonu","sandeep","anjali","monu","sanjay","bandhan","mannu","shrati","nitish"]
router.get('/all-candidates', function (req, res) {
    res.send(arr)
});

router.get('/candidates', function (req, res) {
    let arr2 = []
    if(req.query.count>0 && req.query.count<=10)
    for(let i=0; i<req.query.count;i++){
        arr2.push(arr[i])
    }res.send(arr2)
});



router.get('/movie', function(req,res) {
    let movies=["Pushpa","Dangal","RRR","KGF","Bahubali"]
    res.send(movies)
});

router.get('/movies/:indexNumber', function(req,res) {
    let movies=["Pushpa","Dangal","RRR","KGF","Bahubali"]
    const id = req.params.indexNumber
    if(id<movies.length){
        res.send(movies[id])
    }else{
        res.send('give valid index')
    }
    res.send('movies name')
});

router.get('/films', function(req,res){
    let obj=[ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]

       res.send(obj)
});


router.get('/films/:filmId', function(req,res){
    let obj=[ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
     
       const id = req.params.filmId
       if(id<obj.length){
        res.send(obj[id])
    }else{
        res.send('No movie exists with this id')
    }
    res.send('movies name with id')

});

router.get('/user-profile/:abcd', function(req, res) {
    console.log(req)
    console.log(req.params.abcd)
    res.send('dummy response')
});

router.get('/test-me', function (req, res) {
    console.log('------------------')
    console.log(req)
    console.log('------------------')
    console.log('These are the request query parameters: ', req.query)
    res.send('My first ever api!')
});




module.exports = router;
// adding this comment for no reason