const express = require('express')
const router = express.Router();


router.get("/", (req, res)=>{
    res.redirect("/products")
})

router.get("/map/:orderId", (req, res)=>{
    res.render("map", { orderId: req.params.orderId})
})



module.exports = router;