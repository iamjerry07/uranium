const orderModel= require("../models/ordermodel");
// const usermodel = require('../models/usermodel');
const productmodel = require('../models/productmodel.js');






const createOrder= async function(req,res){
    let data=req.body
    let userId = req.body.userId
    let productId = req.body.productId
    if(!userId || !productId ){
        return res.status(422).send({msg:"user or Product details is required"});
    }
    //let savedData=await orderModel.create(data)
    //res.send({msg: savedData})

    //validation a
    if(!userId) return res.send('The request is not valid as the user details are required.')
    //validation b
    let user = await userModel.findById(userId)
    if(!user) return res.send('The request is not valid as no user is present with the given user id')
    //validation c
    if(!productId) return res.send('The request is not valid as the product details are required.')
// validation d
     let product = await productModel.findById(productId)
     if(!product) return res.send('The request is not valid as no product is present with the given product id')



   

}
let isFreeAppUser = req.headers["isfreeappuser"]
if(isFreeAppUser == 'false'){

    if(product.price < user.balance){
      
    usermodel.updateMany({user:{$eq: user._id }},{$inc: {balance: - product.price}}, {new:true})
            let userdata = req.body;
            userdata.isFreeAppUser= isFreeAppUser;
            userdata.amount = product.price;
            userdata.date = new Date().toLocaleString();
          
            const savedData= ordermodel.create(userdata);
             res.send({status: savedData})

    }else{

         res.send({msg:"you dont have required balence in you'r account"})
            
    }
}else{
            // if user isFreeAppUser = true
            let userdataf = req.body;
            userdataf.isFreeAppUser= isFreeAppUser;
            userdataf.amount = 0;
            userdataf.date = new Date().toLocaleString();
          
            const savedFreeProduct=  ordermodel.create(userdataf);
             res.send({status: savedFreeProduct})


}






const getOrderData= async function (req, res) {
    let allUsers= await UserModel.find()
    console.log(req.newAtribute)
    res.send({msg: allUsers})
}

module.exports.createOrder= createOrder
module.exports.getOrderData= getOrderData