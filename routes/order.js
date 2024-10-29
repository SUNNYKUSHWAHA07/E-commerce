const express = require("express")
const {cartModel} = require("../models/cart")

const paymentModel = require("../models/payment")
const{ orderModel} = require("../models/order")
const router = express.Router();


router.get("/:userid/:orderid/:paymentId/:signature", async function(req, res){
  let paymentDetails =  await paymentModel.findOne({
    orderId:req.params.orderid
  });

  if(!paymentDetails) return res.send("sorry, this order does not exists")

    if(
      req.params.signature === paymentDetails.signature &&
      req.params.paymentId === paymentDetails.paymentId
    )
    {

    let cart = await cartModel.findOne({ user : req.params.userid})


     await orderModel.create({
      orderId: req.params.orderid,
      user: req.params.userid,
      product: cart.products,
      totalPrice: cart.totalPrice, 
      status: "processing" ,
      payment: paymentDetails._id,
     
      });

        res.redirect(`/map/${req.params.orderid}`);
    }else{
        res.send("invalid")
    }

})

router.post("/address/:orderid", async function(req, res){
  let order = await orderModel.findOne({ orderId: req.params.orderid });
  if(!order) return res.status(404).send("order not found");
  if(!req.body.address) return res.send("you must provide an address")
  order.address = req.body.address;
  order.save();
  res.redirect("/")
});


module.exports = router