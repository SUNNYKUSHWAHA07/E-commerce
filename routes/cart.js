const express = require("express");
const router = express.Router();
const {cartModel} = require("../models/cart")
const {userIsLoggedIn} = require("../middelwares/admin")
const {productModel} = require("../models/product");
const cart = require("../models/cart");


router.get("/", userIsLoggedIn, async function(req, res){
   try{
    let cart =  await cartModel.findOne({user: req.session.passport.user}).populate("products")
   if(!cart){
    return res.send("ther is no cart ")
   }

   let cartDataStructure = {};
   cart.products.forEach( product =>{
    let key = product._id.toString();
    if(cartDataStructure[key]){
        cartDataStructure[key].quantity += 1 
    }else{
        cartDataStructure[key] = {
            ...product._doc,
            quantity: 1,
        }
    }
   });

   let finalarray = Object.values(cartDataStructure) 

   res.render("cart", {cart : finalarray, finalPrice:Number(cart.totalPrice)+34, userid:req.session.passport.user,});
   }catch(err){
    res.send(err.message)
   }
})

router.get("/add/:id", userIsLoggedIn, async function(req, res){
    try{
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send("Invalid product ID");
        }

        let cart = await cartModel.findOne({user: req.session.passport.user})
        let product = await productModel.findById(req.params.id)

        if(!product) {
            return res.status(404).send("Product not found")
        }
        
        if(!cart){
          cart = await cartModel.create({
                user: req.session.passport.user,
                products:[req.params.id],
                totalPrice: Number(product.price),
            })
        
        } else {
            cart.products.push(req.params.id)
            cart.totalPrice = Number(cart.totalPrice) + Number(product.price)  



            await cart.save()
        }
      
      return res.redirect("/cart");


    }catch(error){
        res.send(error)
    }
    
})

router.get("/remove/:id", userIsLoggedIn, async function(req, res){
    try{

        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send("Invalid product ID");
        }

    let cart = await cartModel.findOne({user: req.session.passport.user})
    let product = await productModel.findById(req.params.id)
    if(!cart) {
        return res.send("there is nothing in the cart")
    }else{
      let index =  cart.products.indexOf(req.params.id)
      cart.products.splice(index,1)
      cart.totalPrice = Number(cart.totalPrice) - Number(product.price) 
      await cart.save();
    }
    res.redirect("/cart")
    }catch(err){
        res.send(err.message) 
    }
})

// router.get("/remove/:id", userIsLoggedIn, async function(req,res){
//     try{
//         let cart = await cartModel.findOne({user:req.session.passport.user})
//         if(!cart) return res.send("something is wrong while removing item.")
//         let index =  cart.products.indexOf(req.params.id)
//         if(index !== -1)  cart.products.splice(index,1)
//         else return res.send("item is not in the cart.")
    
//         await cart.save();

//         res.redirect("back")

//     }catch(err){
//         res.send(err.message)
//     }
// })

module.exports = router