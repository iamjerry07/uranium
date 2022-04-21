const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://rohanDb:iamjerry@cluster0.etldx.mongodb.net/middleware?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

// app.use (
//     function (req, res, next) {
//         let myip= req.ip
//         let myurl= req.url
//         var currentdate = new Date(); 
//         var datetime = "Last Sync: " + currentdate.getDate() + "/"
//                         + (currentdate.getMonth()+1)  + "/" 
//                         + currentdate.getFullYear() + " @ "  
//                         + currentdate.getHours() + ":"  
//                         + currentdate.getMinutes() + ":" 
//                         + currentdate.getSeconds();
                         
                            
//         console.log ("HELLO!! I am universal MW", datetime +"  ,"+  myip +"  ," +myurl);
       
//         next();
//   }
//   );

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
