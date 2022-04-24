const jwt= require(`jsonwebtoken`);
const userModel= require("../models/userModel")

let middleware= async function(req,res,next){
    let token= req.headers["x-auth-token"]
    let decodedToken=jwt.verify(token,"functionup-thorium");
    if(!decodedToken)
    return res.send({status:false,msg:"token is invalid"});
    next();
}

module.exports.middleware=middleware