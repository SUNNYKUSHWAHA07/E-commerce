const express = require('express');
const router = express.Router();
const {productModel, validateProduct} = require("../models/product")
const {categoryModel} = require("../models/category");
const {validateAdmin, userIsLoggedIn} = require("../middelwares/admin")
const category = require('../models/category');
const upload = require("../config/multer");
const { cartModel } = require('../models/cart');

router.get("/", userIsLoggedIn, async function(req, res){
 let somethingInCart = false

  const resultArray = await productModel.aggregate([
    {
        $group:{
            _id :"$category",
            products: {$push: "$$ROOT"},
        },
    },
    {
       $project: {
            _id: 0,
            category: "$_id",
            products: { $slice : ["$products", 10] },
       }
    },
]);


const resultObject = resultArray.reduce((acc,item)=>{
    acc[item.category] = item.products;
    return acc;
}, {});


let rnproducts = await productModel.aggregate([{ $sample: { size:3 }}])
 let cart = await cartModel.findOne({user: req.session.passport.user})
 if(cart && cart?.products.length > 0) somethingInCart = true ;
    res.render("index", {products: resultObject, 
      rnproducts,
       somethingInCart,
        cartCount: cart ? cart.products.length : 0,
       });
});

router.get("/delete/:id", validateAdmin, async function(req, res){
if(req.user.admin){
  let prods = await productModel.findOneAndDelete({_id: req.params.id});
  return res.redirect("/admin/products")
}
res.send("you are not allowed to delete this product")
 
})

router.post("/delete", validateAdmin, async function(req,res){
  if(req.user.admin){
    let prods = await productModel.findOneAndDelete({_id: req.body.product_id});
     return res.redirect("/admin/products")
  }
  res.redirect("back")
  
})

router.post("/", upload.single("image"), async function(req, res){

   let {name, price, description, category, stock, image} =  req.body
 
   let {error} = validateProduct({
    name,
    price,
    description,
    category,
    stock,
    image,
   });

   if(error) return res.send(error.message)

    const isCategory = await categoryModel.findOne({name : category});
    if(!isCategory) {
      await categoryModel.create({ name: category });
    }

    await productModel.create({
        name,
        price,
        description,
        category,
        image: req.file.buffer,
        stock,
    });

    res.redirect("/admin/products")



  
})


module.exports = router